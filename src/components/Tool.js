import { useState, useEffect, useContext } from 'react';
// import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import { ThemeContext } from '../contexts/ThemeContext';
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
import UserContext from '../contexts/UserContext';
import SubscriptionSwitch from './SubscriptionSwitch';
import defaultFormData from '../defaultFormData';
import ReCaptchaV3 from './ReCaptchaV3';
import AgreementBanner from './AgreementBanner';

function Tool() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  // const { user, setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  // const user = useMemo(() => ({
  //   email: 'client@gmail.com',
  //   username: 'c',
  //   subscription: 'none',
  // }), []);
  const [validationMessage, setValidationMessage] = useState('');
  const [clipInputs, setClipInputs] = useState([<ClipTimeInput key={1} clipNumber={1} handleRemove={handleRemoveClipTimeInput(1)} newTimes={["00:00:00", "00:00:00"]} />]);
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
  const [currentClipName, setCurrentClipName] = useState('');
  const [building, setBuilding] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [subTextColor, setSubTextColor] = useState('');
  const [buildAction, setBuildAction] = useState('');
  const [formData, setFormData] = useState({ ...defaultFormData });
  const [resetPending, setResetPending] = useState(false);
  const [processCancelable, setProcessCancelable] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [dontBuildYet, setDontBuildYet] = useState(true);
  const [fileKey, setFileKey] = useState(0);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const { theme } = useContext(ThemeContext);
  // const [shouldCloseWebsocket, setShouldCloseWebsocket] = useState(false);

  useEffect(() => {
    if (resetPending) {
      setResetPending(false);
    }
  }, [formData, resetPending]);

  useEffect(() => {
    if(user){
      switch (user.subscription) {
        case 'none':
          // setSubscriptionMessage('Subscribe to unlock all disabled features.');
          setSubscriptionMessage(
            <span>
              <Link className={`${theme === 'light' ? 'text-current' : ''}`} to="/subscriptions">Subscribe</Link> to unlock all disabled features.
            </span>
          );
          setSubTextColor('text-current');
          break;
        case 'base':
          setSubscriptionMessage('You are using the Base plan with additional features.');
          setSubTextColor('base-color');
          break;
        case 'advanced':
          setSubscriptionMessage('You are using the Advanced plan with additional features.');
          setSubTextColor('advanced-color');
          break;
        case 'premium':
          setSubscriptionMessage('You are using the Pro plan with all features unlocked.');
          setSubTextColor('premium-color');
          break;
        default:
          setSubscriptionMessage('Subscribe to unlock all disabled features.');
          break;
      }
    } else {
      // setSubscriptionMessage('You are using the Free plan with limited features.');
      setSubscriptionMessage(
        <span>
          <Link className={`${theme === 'light' ? 'text-current' : ''}`} to="/subscriptions">Subscribe</Link> to unlock all disabled features.
        </span>
      );
      setSubTextColor('text-current');
    }
  }, [user, theme]);

  useEffect(() => {
    console.log("Websocket useEffect called")
    // const socket = io('http://127.0.0.1:5000');
    const socket = io(backendURL);
    socket.on('connect', () => {console.log("Connected")});
    
    socket.onAny((event, data) => {
      console.log(event, data);
    });

    socket.on('current_clip_in_edit', (data) => {
      // console.log('Current clip in edit:', data)
      if(data.name !== currentClipName) {
        setCurrentClipName(data.name);
      }
    });
    socket.on('video_processing_progress', (data) => {
      setProgress(data.progress);
    });
    socket.on('build_action', (data) => {
      setBuildAction(data.action);
    });
    socket.on('video_file_ready', (data) => {
      console.log('Received', data.name);
      const newVideoClip = new ClipModel(data.name, data.filename, false);
    
      setVideoClips((prevState) => {
        let updated = false;
        const updatedClips = prevState.map((clip, index) => {
          if (!updated && clip.name === data.name) {
            updated = true;

            // Check if the current clip is the last clip in the array
            if (index === prevState.length - 1) {
              setBuilding(false);
              setProcessCancelable(false);
            }

            return newVideoClip;
          }
          return clip;
        });
    
        localStorage.setItem('videoFiles', JSON.stringify(updatedClips));
        return updatedClips;
      });

      if (progress === 100) {
        setProgress(0);
      }
      // setCurrentClipIndex((prevIndex) => prevIndex + 1);
    });
    socket.on("processing_canceled", (data) => {
      console.log('Processing canceled:', data)
    });
    return () => {
      console.log("Disconnected")
      socket.disconnect();
    };
  });
  // }, [videoClips, progress, currentClipName, backendURL, user, setUser]);

  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => new Tooltip(tooltip));
  }, []);

  useEffect(() => {
    localStorage.setItem('videoFiles', JSON.stringify(videoClips));
  }, [videoClips]);

  useEffect(() => {
    if (fileKey) {
        //set a variable to enable the build button
        setDontBuildYet(false);
    }

  }, [fileKey]);

  const handleVideoFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // Request the pre-signed URL from the server
      try {
        console.log("Retreiving presigned url...")
        const response = await axios.post(backendURL + '/generate-presigned-url', {
          fileName: file.name,
          fileType: file.type,
        });
  
        const presignedUrl = response.data.presigned_url;
        const uniqueFileKey = response.data.fileName;

  
        // Upload the file to S3
        console.log("Uploading file to s3...")
        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': file.type
          },
          timeout: 0,  // no timeout
          onUploadProgress: function(progressEvent) {
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadPercentage(percentCompleted);
          }
        });
        console.log('File uploaded successfully');        
        // console.log("Uploading file to s3...")
        // const putRequest = new Request(presignedUrl, {
        //   method: 'PUT',
        //   body: file,
        //   headers: new Headers({
        //     'Content-Type': file.type,
        //   }),
        // });

        // fetch(putRequest).then(response => {
        //   if(response.ok) {
        //     console.log('File uploaded successfully');
        //   } else {
        //     response.text().then(text => {
        //       console.error('Error during upload:', text);
        //     });
        //   }
        // }).catch(error => {
        //   console.error('Network error:', error);
        // });
        
        //set the file key value so it can be used in the post request later
        setFileKey(uniqueFileKey)
  
      } catch (err) {
        console.error('Error generating pre-signed URL or uploading file', err);
      }
  
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

  const buildEmptyClips = (numberOfClips) => {
    const emptyClips = Array.from({ length: numberOfClips }, (_, index) => new ClipModel(`Clip ${index + 1}`, '', true));
    setVideoClips(emptyClips);
  }

  function convertToSeconds(timestamp) {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }  

  // const cleanFileName = (file) => {
  //   if (file) {
  //     // Clean the file name by replacing any unwanted characters
  //     const cleanFileName = file.name.replace(/[^\w.-]+/g, '_');

  //     // Create a new File object with the clean file name and same properties as the original file
  //     return new File([file], cleanFileName, { type: file.type, lastModified: file.lastModified });
  //   }
  // }

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

    if (!formData.get('start-time-1')) {
      return { isValid: false, errorMessage: 'Please create at least one clip.' };
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
    setProcessCancelable(true);
    return { isValid: true, errorMessage: '' };
  };

  const handleSubmit = (event) => {
    console.log("Submitting");
    event.preventDefault();
    localStorage.removeItem('videoFiles');
    const formData = new FormData(event.target);
    const validationResult = validateForm(formData);
    if (!validationResult.isValid) {
      setValidationMessage(validationResult.errorMessage);
      return;
    }
    setValidationMessage('');
    setVideoClips([]);
    buildEmptyClips(clipInputs.length);

    console.log("File key:", fileKey);
    formData.set('video-file', fileKey);
  
    axios.post(backendURL + '/trim', formData)
      .then((response) => {
        console.log(response.data.message);
        setBuilding(false);
        setProcessCancelable(false);
      })
      .catch(error => {
        let errorMsg = '';
        if (error.response) {
          // The request was made and the server responded with a non-2xx status code
          // errorMsg = error.response.data.message;
          errorMsg = error.message;
        } else if (error.request) {
          // The request was made but no response was received
          errorMsg = 'No response received from server. Please check your network connection or try again later.';
        } else {
          // Something happened in setting up the request and triggered an Error
          errorMsg = error.message;
        }
        setValidationMessage(errorMsg);
        cancelWholeProcess();
        setBuilding(false);
        errorWithDelivery();
        console.log(error);
      })
      .finally(() => {
        console.log("handleSubmit Closing");
      });

  };

  const errorWithDelivery = () => {
    setVideoClips(prevClips => 
      prevClips.filter(clip => clip.loading !== true)
    );
  }

  const handleCancel = (clipName) => {
    setProgress(0);
    const socket = io(backendURL);
    socket.emit("cancel_processing", { clipName: clipName });
  
    // Update the videoClips state to remove the clip with the specified clipName
    setVideoClips((prevState) => {
      const updatedClips = prevState.filter((clip) => {
        return clip.name !== clipName;
      });
        // If updatedClips is empty, set building to false
        if (updatedClips.length === 0) {
          // setBuilding(false);
          setProcessCancelable(false);
          // setShouldCloseWebsocket(true);
        }
      return updatedClips;
    });
    
  };

  const cancelWholeProcess = () => {
    // console.log("Canceling remaining process");
    // Filter the videoClips to get the names of clips with loading value true
    const undeliveredClipNames = videoClips
      .filter((clip) => clip.loading)
      .map((clip) => clip.name);
  
    // Loop through the undelivered clip names and call handleCancel for each
    undeliveredClipNames.forEach((clipName) => handleCancel(clipName));
    // setBuilding(false);
    setProcessCancelable(false);
  };

  const clearVideoClips = () => {
    setVideoClips([]);
    console.log("Clearing video clips");
  };

  function handleAddClipTimeInput() {
    setClipInputs(prevState => {
      const clipNumber = prevState.length + 1;
      return [...prevState, <ClipTimeInput key={clipNumber} clipNumber={clipNumber} handleRemove={handleRemoveClipTimeInput(clipNumber)} newTimes={["00:00:00", "00:00:00"]} />];
    });
  }

  function handleRemoveClipTimeInput(clipNumberToRemove) {
    return () => {
      setClipInputs(prevState => {
        const newClipInputs = prevState.filter(clipInput => clipInput.props.clipNumber !== clipNumberToRemove);
        return newClipInputs.map((clipInput, index) => {
          const newClipNumber = index + 1;
          const newHandleRemove = handleRemoveClipTimeInput(newClipNumber);

          const timestamps = [];

          if (newClipNumber < clipNumberToRemove){
            timestamps.push(document.getElementById(`start-time-${index + 1}`).value);
            timestamps.push(document.getElementById(`end-time-${index + 1}`).value);
          }

          //if the newClipInputs length +1 is greater than the clipNumberToRemove
          if(newClipNumber >= clipNumberToRemove) {
            const nextClipStartTime = document.getElementById(`start-time-${newClipNumber + 1}`).value;
            const nextClipEndTime = document.getElementById(`end-time-${newClipNumber + 1}`).value;
            timestamps.push(nextClipStartTime);
            timestamps.push(nextClipEndTime);
          }

          return <ClipTimeInput key={newClipNumber} clipNumber={newClipNumber} handleRemove={newHandleRemove} newTimes={timestamps}/>;
        });
      });
    };
  }

  const handleReset = () => {
    // Clear the "video-file" field
    const videoFileField = document.getElementById("video-file");
    videoFileField.value = "";
  
    // Select all elements with an ID starting with "start-time-" or "end-time-"
    const startTimeFields = document.querySelectorAll('[id^="start-time-"]');
    const endTimeFields = document.querySelectorAll('[id^="end-time-"]');
  
    // Reset the values of the selected elements
    const resetField = (field) => {
      field.value = "00:00:00";
    };
  
    startTimeFields.forEach(resetField);
    endTimeFields.forEach(resetField);

    // const resetTimes = ["00:00:00", "00:00:00"];
    setClipInputs([<ClipTimeInput key={1} clipNumber={1} handleRemove={handleRemoveClipTimeInput(1)} newTimes={["00:00:00", "00:00:00"]}/>]);
    setValidationMessage('');
    setUploadPercentage(0);
    setResetPending(true);
    setFormData({ ...formData });
  };
  
  return (
    <div className="Tool mx-auto flex flex-col gap-4 mb-5">
        <AgreementBanner />
        {/* H1 and paragraph */}
        <div>
          <h1>Clip Creation Tool</h1>
          {/* <p>
            Upload your full length video file and enter the timestamps for your desired clips. 
            The Podcast Clip Bot will then create the clips for you to download. Each clip will 
            automatically crop the video to the proper short-form aspect ratio, center the video, add subtitles, 
            and add random royalty free background music. If you would like to customize the tool to 
            create higher value clips, we have subscription options available that allow for highly customizable clips.
          </p> */}
        </div>

        {/* Form */}
        <form className='flex flex-col gap-5' id="trim-form" onSubmit={handleSubmit} encType="multipart/form-data">
          
          {/* Step 1 */}
          <div className="form-group flex flex-col gap-2">
              {/* <label className="flex gap-2 font-bold" htmlFor="video-file">1. Your full length video file: */}
              <label className="flex gap-2 font-bold">1. Your full length video file:
                <span
                  className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Accepted file types: MP4, WebM, Ogg, MOV, AVI, FLV, MKV, WMV, MPEG, 3GP, M4V"
                >?</span>
              </label>
            <input type="file" id="video-file" name="video-file" className="form-control-file" onChange={handleVideoFileChange} disabled={disableForm}/>
            <div className="progress w-full border border-secondary" style={{ height: '10px' }}>
              <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${uploadPercentage}%` }}
                  aria-valuenow={uploadPercentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
              ></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="form-group flex flex-col gap-3">
            <div className='flex justify-between items-center p-0'>
              {/* <label className="font-bold" htmlFor="add-clips">2. Your clip timestamps:</label> */}
              <label className="font-bold">2. Your clip timestamps:</label>
              <button type="button" id="add-clips" className="btn btn-primary w-36" onClick={handleAddClipTimeInput} disabled={disableForm}>
                <FontAwesomeIcon icon={faPlus} /> Add A Clip
              </button>
            </div>
            {clipInputs}
          </div>
          {/* Step 3 */}
          <div className="form-group flex flex-col gap-3">
            <div className='flex flex-wrap gap-4'>
              <label className="font-bold">3. Your clip settings:</label>
              {<div className={subTextColor}>{subscriptionMessage}</div>}
            </div>
            <div>
              {resetPending ? 
                  <div className="flex flex-col gap-2 items-center">
                      <ClipLoader color="primary" size={50} className="loading-icon" />
                      <p className='text-xs'>Resetting form...</p>
                  </div> :
                  // <SubscriptionSwitch user={user} formData={formData}/>
                  <SubscriptionSwitch formData={formData}/>
              }
            </div>
          </div>
          {/* Step 4 */}
          <div className="form-group flex flex-col gap-2">
            <label className="font-bold">4. Build your clips:</label>
            {validationMessage && <p className="text-red-500">{validationMessage}</p>}
            <div className="flex justify-between">
              <div className="flex gap-3">
              {building && !processCancelable ? (
                <button type="submit" id="trim-button" className="btn btn-primary w-36 flex items-center" disabled>
                <div className="flex items-center gap-2">
                  <ClipLoader color="white" size={17} className="loading-icon" />
                  <span>Build Clips</span>
                </div>
              </button>
                ) : (
                <button type="submit" id="trim-button" className="btn btn-primary w-36" disabled={building || disableForm || dontBuildYet}
                >
                  <FontAwesomeIcon icon={faHammer} /> Build Clips
                </button>
                )}
                {building && processCancelable ? (
                  <button className="text-xs" type="button" onClick={cancelWholeProcess}>
                    Cancel Remaining Process
                  </button>
                ) : (
                  videoClips.length > 0 && (
                    <button className="text-xs" type="button" onClick={clearVideoClips}>
                      Clear Video Clips
                    </button>
                  )
                )}
              </div>
              <button className="text-xs" type="button" onClick={handleReset}>
                Reset Form
              </button>
            </div>
          </div>

          <ReCaptchaV3 action={'tool'} setDisableForm={setDisableForm}/>
          
        </form>

        {buildAction === 'Being Retreived' && (
          <div>
            Your video is being retrieved. Please wait...
          </div>
        )}

        {/* Display Clips */}
        <div className="flex gap-2 flex-wrap">
          {videoClips.map((clip, index) => (
            <div key={index} className="border border-secondary mr-2">
              {clip.loading ? (
                clip.name === currentClipName ? (
                  <div className="clip-box relative flex items-center justify-center">
                    <div className="w-11/12 flex flex-col gap-3 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className='text-xs'>{buildAction} {clip.name}</p>
                        <div className="progress w-full border border-secondary" style={{ height: '10px' }}>
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
                            className="btn btn-danger"
                            onClick={() => handleCancel(clip.name)}
                        >
                        Cancel
                        </button>
                    </div>
                </div>
                ) : (
                  <div className="clip-box relative">
                    <div className="w-full flex flex-col gap-2 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <ClipLoader color="primary" size={50} className="loading-icon" />
                        <p className='text-xs'>{clip.name} waiting...</p>
                    </div>
                  </div>
                )
              ) : (
                <div>
                  <CustomVideoPlayer
                    // src={`http://127.0.0.1:5000/uploads/${clip.filename}?v=${Date.now()}`}
                    src={`${backendURL}/uploads/${clip.filename}?v=${Date.now()}`}
                    filename={clip.filename}
                    clipName={clip.name}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

    </div>
  );
}

export default Tool;
