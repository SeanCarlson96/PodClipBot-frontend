import { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import ClipTimeInput from './ClipTimeInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Tool() {
  const [message, setMessage] = useState('');
  const [videoFilename, setVideoFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

//   const [progressNum, setProgressNum] = useState(2);

  // useEffect(() => {
  //   const source = new EventSource('http://127.0.0.1:5000/progress');
  //   source.onmessage = (event) => {
  //     setProgress(parseFloat(event.data));
  //   };
  //   return () => {
  //     source.close();
  //   };
  // }, []);

  // const handleSubmit = (event) => {
  //   event.preventDefault(); // prevent the form from submitting normally

  //   const formData = new FormData(event.target); // create a FormData object from the form data
  //   setLoading(true);
  //   axios.post('http://127.0.0.1:5000/trim', formData)
  //     .then(response => {
  //       setVideoFilename(response.data.file);
  //       setMessage('Video trimmed successfully.');
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setMessage('Error trimming video.');
  //       console.error(error);
  //       setLoading(false);
  //     });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault(); // prevent the form from submitting normally
  
  //   const formData = new FormData(event.target); // create a FormData object from the form data
  //   setLoading(true);
  //   axios.post('http://127.0.0.1:5000/trim', formData)
  //     .then(response => {
  //       setVideoFilename(response.data.file);
  //       setMessage('Video trimmed successfully.');
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setMessage('Error trimming video.');
  //       console.error(error);
  //       setLoading(false);
  //     });
  
  //   // Set up event source to receive progress updates
  //   const source = new EventSource('http://127.0.0.1:5000/progress');
  //   source.onmessage = (event) => {
  //     // console.log("Received progress update:", event.data);
  //     setProgress(parseFloat(event.data));
  //   };
  //   source.onerror = (event) => {
  //     console.log("Error receiving progress updates:", event);
  //   }
  //   return () => {
  //     console.log("Closing progress updates source");
  //     source.close();
  //   };
  // };
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from submitting normally
  
    const formData = new FormData(event.target); // create a FormData object from the form data
    setLoading(true);
  
    // Set up event source to receive progress updates
    const source = new EventSource('http://127.0.0.1:5000/progress');
    source.onmessage = (event) => {
      // console.log("Received progress update:", event.data);
      setProgress(parseFloat(event.data));
    };
    source.onerror = (event) => {
      // console.log("Error receiving progress updates:", event);
      console.log("Error receiving progress");
    };
  
    axios.post('http://127.0.0.1:5000/trim', formData)
      .then(response => {
        setVideoFilename(response.data.file);
        setMessage('Video trimmed successfully.');
        setLoading(false);
        console.log("Closing progress updates source");
        source.close(); // Close the event source when the video is trimmed successfully
      })
      .catch(error => {
        setMessage('Error trimming video.');
        console.error(error);
        setLoading(false);
        console.log("Closing progress updates source");
        source.close(); // Close the event source when an error occurs
      });
  
    return () => {
      console.log("Closing progress updates source");
      source.close();
    };
  };
  

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `http://127.0.0.1:5000/uploads/${videoFilename}`;
    link.download = 'trimmed_video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [clipInputs, setClipInputs] = useState([<ClipTimeInput key={1} clipNumber={1} handleRemove={handleRemoveClipTimeInput(1)} />]);

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
        <h1 className="font-extralight">PodClipBot Clip Creation Tool</h1>
        <p className="font-light">Upload your full length video file and enter the timestamps for your desired clips. The Podcast Clip Bot will then create the clips for you to download. Each clip will automatically crop the video to the proper aspect ratio, center the video, add subtitles, and add random royalty free background music. If you would like to customize the tool to create higher value clips, we have subscription options available that allow for highly customizable clips.</p>

        <form id="trim-form" onSubmit={handleSubmit} encType="multipart/form-data" className='mt-10 flex flex-col gap-4'>
          
          <div className="form-group">
            <label htmlFor="video-file">1. Upload your full length video file:</label>
            <input type="file" id="video-file" name="video-file" className="form-control-file" />
          </div>

          <div className="form-group flex flex-col gap-2">
            <div className='flex justify-between'>
              <label htmlFor="video-file">2. Add timestamps for as many clips as you'd like:</label>
              <button type="button" className="btn btn-primary w-36 self-end" onClick={handleAddClipTimeInput}>
                <FontAwesomeIcon icon={faPlus} /> Add A Clip
              </button>
            </div>
            {clipInputs}
          </div>

          <div className="form-group flex flex-col gap-2">
            <label htmlFor="video-file">3. Build your clips:</label>
            <button type="submit" id="trim-button" className="btn btn-primary w-36 self-start">
              <FontAwesomeIcon icon={faHammer} /> Build Clips
            </button>
          </div>

        </form>

        {message && <p>{message}</p>}
        {loading && <ClipLoader color="#123abc" css={override} size={50} id="loading-icon"/>}
        {progress > 0 ? (
          <div>
            <progress value={progress} max="100" />
          </div>
        ) : null}
        {videoFilename && (
          <div>
            <h2>Trimmed Video</h2>
            <video width="152" height="270" controls>
              <source src={`http://127.0.0.1:5000/uploads/${videoFilename}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <br />
            <button onClick={handleDownload} className="btn btn-primary">
              Download Trimmed Video
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Tool;
