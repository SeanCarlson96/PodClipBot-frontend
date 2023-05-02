import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import ClipTimeInput from './ClipTimeInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
import CustomVideoPlayer from './CustomVideoPlayer';
import { Tooltip } from 'bootstrap';
import io from 'socket.io-client';
import ClipModel from '../ClipModel';

function Tool() {
  // const [message, setMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [clipInputs, setClipInputs] = useState([<ClipTimeInput key={1} clipNumber={1} handleRemove={handleRemoveClipTimeInput(1)} />]);
  const [videoDuration, setVideoDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoClips, setVideoClips] = useState(() => {
    const storedFiles = localStorage.getItem('videoFiles');
    return storedFiles
      ? JSON.parse(storedFiles).map(
          (fileObj) => new ClipModel(fileObj.name, fileObj.filename, false)
        )
      : [];
  });
  // const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [currentClipName, setCurrentClipName] = useState('');
  const [building, setBuilding] = useState(false);

  // console.log(videoClips)
  // console.log(currentClipIndex)
  // console.log(currentClipName)
  
  // useEffect(() => {
  //   // console.log('videoClips', videoClips)
  //   const socket = io('http://127.0.0.1:5000');
  //   socket.on('connect', () => {
  //     // console.log('Connected to the server');
  //   });
  //   socket.on('current_clip_in_edit', (data) => {
  //     console.log('Current clip in edit:', data)
  //     if(data.name !== currentClipName) {
  //       setCurrentClipName(data.name);
  //     }
  //   });
  //   socket.on('video_processing_progress', (data) => {
  //     // console.log('Progress:', data);
  //     setProgress(data.progress);
  //   });
  //   socket.on('video_file_ready', (data) => {
  //     console.log('Received ', data.name);
  //     const newVideoClip = new ClipModel(data.name, data.filename, false);
    
      // setVideoClips((prevState) => {
      //   let updated = false;
      //   const updatedClips = prevState.map((clip, index) => {
      //     if (!updated && clip.name === data.name) {
      //       updated = true;

      //       // Check if the current clip is the last clip in the array
      //       if (index === prevState.length - 1) {
      //         setBuilding(false);
      //       }

      //       return newVideoClip;
      //     }
      //     return clip;
      //   });
    
  //       localStorage.setItem('videoFiles', JSON.stringify(updatedClips));
  //       return updatedClips;
  //     });

  //     if (progress === 100) {
  //       setProgress(0);
  //     }
  //     // setCurrentClipIndex((prevIndex) => prevIndex + 1);
  //   });
  //   socket.on("processing_canceled", (data) => {
  //     console.log('Processing canceled:', data)
  //     // const clipName = data.clipName;
    
  //     // setVideoClips((prevState) => {
  //     //   return prevState.map((clip) =>
  //     //     clip.name === clipName
  //     //       ? new ClipModel(clip.name, clip.filename, false)
  //     //       : clip
  //     //   );
  //     // });
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [videoClips, progress, currentClipName]);

  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => new Tooltip(tooltip));
  }, []);

  useEffect(() => {
    localStorage.setItem('videoFiles', JSON.stringify(videoClips));
  }, [videoClips]);

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);

        // Set the video duration
        setVideoDuration(video.duration);
      };
    } else {
      // Reset the video duration if the file is removed
      setVideoDuration(0);
    }
  };

  const calculateClipsExpected = (formData) => {
    let entriesCount = 0;
    formData.forEach(() => {
      entriesCount++;
    });
    const result = (entriesCount - 1) / 2;
    buildEmptyClips(result);
  };

  const buildEmptyClips = (numberOfClips) => {
    const emptyClips = Array.from({ length: numberOfClips }, (_, index) => new ClipModel(`Clip ${index + 1}`, '', true));
    setVideoClips(emptyClips);
  }

  function convertToSeconds(timestamp) {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }  

  const cleanFileName = (file) => {
    if (file) {
      // Clean the file name by replacing any unwanted characters
      const cleanFileName = file.name.replace(/[^\w.-]+/g, '_');

      // Create a new File object with the clean file name and same properties as the original file
      return new File([file], cleanFileName, { type: file.type, lastModified: file.lastModified });
    }
  }

  const validateForm = (formData) => {
    const videoFile = formData.get('video-file');
    const allowedFileTypes = [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-flv',
      'video/x-matroska',
      'video/x-ms-wmv',
      'video/mpeg',
      'video/3gpp',
      'video/x-m4v',
    ];
    const maxFileSize = 10 * 1024 * 1024 * 1024; // 10 GB

    if (videoFile.name === '') {
      return { isValid: false, errorMessage: 'Please upload a video file.' };
    }

    if (!allowedFileTypes.includes(videoFile.type)) {
      return { isValid: false, errorMessage: 'Invalid file type. Please upload a video file of one of our support types.' };
    }

    if (videoFile.size > maxFileSize) {
      return { isValid: false, errorMessage: 'File size exceeds the 10 GB limit. Please upload a smaller video file.' };
    }

    let index = 1;
    let startTime, endTime;

    while ((startTime = formData.get(`start-time-${index}`)) && (endTime = formData.get(`end-time-${index}`))) {
      const startTimeNumber = convertToSeconds(startTime);
      const endTimeNumber = convertToSeconds(endTime);

      if (startTimeNumber > videoDuration || endTimeNumber > videoDuration) {
        return { isValid: false, errorMessage: `Start and end times for clip ${index} must be within the video's duration.` };
      }

      if (startTimeNumber >= endTimeNumber) {
        return { isValid: false, errorMessage: `End time for clip ${index} must be greater than the start time.` };
      }

      index++;
    }
    setBuilding(true);
    return { isValid: true, errorMessage: '' };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Building clips")
    localStorage.removeItem('videoFiles');
    // setVideoFilenames([]);
    setVideoClips([]);
    const formData = new FormData(event.target);
    const validationResult = validateForm(formData);
    if (!validationResult.isValid) {
      setValidationMessage(validationResult.errorMessage);
      return;
    }
    setValidationMessage('');
    calculateClipsExpected(formData);
    // setLoading(true);
    const file = formData.get('video-file');
    formData.set('video-file', cleanFileName(file));
  
    axios.post('http://127.0.0.1:5000/trim', formData)
      .then(() => {
        // The POST request is sent, and the WebSocket event listener will
        // handle the video files as they arrive
      })
      .catch(error => {
        // setMessage('Error constructing clips.');
        // setLoading(false);
      });
  
    return () => {
      console.log("Closing");
    };
  };

  const handleCancel = (clipName) => {
    console.log("Canceling " + clipName);
    setProgress(0);
    // Emit the cancel_processing message with the clip's name
    const socket = io('http://127.0.0.1:5000');
    socket.emit("cancel_processing", { clipName: clipName });
  
    // Update the videoClips state to remove the clip with the specified clipName
    setVideoClips((prevState) => {
      const updatedClips = prevState.filter((clip) => {
        return clip.name !== clipName;
      });
      return updatedClips;
    });
    
  };

  const cancelWholeProcess = () => {
    // Emit the 'cancel_all_processing' event
    const socket = io('http://127.0.0.1:5000');
    socket.emit('cancel_all_processing');
  };

  const clearVideoClips = () => {
    setVideoClips([]);
  };

  function handleAddClipTimeInput() {
    setClipInputs(prevState => {
      const clipNumber = prevState.length + 1;
      return [...prevState, <ClipTimeInput key={clipNumber} clipNumber={clipNumber} handleRemove={handleRemoveClipTimeInput(clipNumber)} />];
    });
  }

  function handleRemoveClipTimeInput(clipNumberToRemove) {
    return () => {
      setClipInputs(prevState => {
        const newClipInputs = prevState.filter(clipInput => clipInput.props.clipNumber !== clipNumberToRemove);
        return newClipInputs.map((clipInput, index) => {
          const newClipNumber = index + 1;
          const newHandleRemove = handleRemoveClipTimeInput(newClipNumber);
          return <ClipTimeInput key={newClipNumber} clipNumber={newClipNumber} handleRemove={newHandleRemove} />;
        });
      });
    };
  }
  
  return (
    <div className="Tool">
      <header className="App-header">
        <h1 className="font-extralight">Clip Creation Tool</h1>
        <p className="font-light">
          Upload your full length video file and enter the timestamps for your desired clips. 
          The Podcast Clip Bot will then create the clips for you to download. Each clip will 
          automatically crop the video to the proper short-form aspect ratio, center the video, add subtitles, 
          and add random royalty free background music. If you would like to customize the tool to 
          create higher value clips, we have subscription options available that allow for highly customizable clips.
        </p>

        <form id="trim-form" onSubmit={handleSubmit} encType="multipart/form-data" className='mt-10 flex flex-col gap-4'>
          <div className="form-group">
            <label htmlFor="video-file">1. Upload your full length video file:</label>
            <span
              className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-300 text-gray-700"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Accepted file types: MP4, WebM, Ogg, MOV, AVI, FLV, MKV, WMV, MPEG, 3GP, M4V"
            >
              ?
            </span>
            <input type="file" id="video-file" name="video-file" className="form-control-file"  onChange={handleVideoFileChange} />
          </div>
          <div className="form-group flex flex-col gap-2">
            <div className='flex justify-between mb-2'>
              <label className='border border-black' htmlFor="add-clips">2. Add timestamps for as many clips as you'd like:</label>
              <button type="button" id="add-clips" className="btn btn-primary w-36 self-end" onClick={handleAddClipTimeInput}>
                <FontAwesomeIcon icon={faPlus} /> Add A Clip
              </button>
            </div>
            {clipInputs}
          </div>
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="trim-button">3. Build your clips:</label>
            {validationMessage && <p className="text-red-500">{validationMessage}</p>}
            <div>
              <button type="submit" id="trim-button" className="btn btn-primary w-36 self-start">
                <FontAwesomeIcon icon={faHammer} /> Build Clips
              </button>
              {building ? (
                <button className="text-xs ml-3" onClick={cancelWholeProcess}>
                  Cancel Entire Process
                </button>
              ) : (
                videoClips.length > 0 && (
                  <button className="text-xs ml-3" onClick={clearVideoClips}>
                    Clear Video Clips
                  </button>
                )
              )}
            </div>
          </div>
        </form>

        {/* {message && <p>{message}</p>} */}

        <div className="d-flex flex-wrap">
          {videoClips.map((clip, index) => (
            <div key={index} className="border border-black mr-2">
              {clip.loading ? (
                clip.name === currentClipName ? (
                  <div className="clip-box relative flex items-center justify-center">
                    <div className="w-11/12  flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className='text-xs'>Constructing {clip.name}</p>
                        <div className="progress w-full" style={{ height: '10px' }}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                              style={{ width: `${progress}%` }}
                              aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                        </div>
                        <button
                            className="btn btn-danger mt-4"
                            onClick={() => handleCancel(clip.name)}
                        >
                        Cancel
                        </button>
                    </div>
                </div>
                ) : (
                  <div className="clip-box relative">
                    <div className="w-full flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <ClipLoader color="#123abc" size={50} id="loading-icon" />
                        <p className='text-xs pt-2'>{clip.name} waiting...</p>
                    </div>
                  </div>
                )
              ) : (
                <div>
                  {/* <p>Name = {clip.name}</p> */}
                  <CustomVideoPlayer
                    src={`http://127.0.0.1:5000/uploads/${clip.filename}`}
                    filename={clip.filename}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

      </header>
    </div>
  );
}

export default Tool;

