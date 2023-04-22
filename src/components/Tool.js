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
  // const [videoFilename, setVideoFilename] = useState('');
  // setVideoFilename('');
  const [videoFilenames, setVideoFilenames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clipInputs, setClipInputs] = useState([<ClipTimeInput key={1} clipNumber={1} handleRemove={handleRemoveClipTimeInput(1)} />]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  
  //   const formData = new FormData(event.target);
  //   setLoading(true);
    
  //   // Log the FormData key-value pairs
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value}`);
  //   }
  
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
  
  //   return () => {
  //     console.log("Closing");
  //   };
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    setLoading(true);
  
    // Log the FormData key-value pairs
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    axios.post('http://127.0.0.1:5000/trim', formData)
      .then(response => {
        setVideoFilenames(response.data.files); // Set array of video filenames
        console.log(response.data.files);
        setMessage('Video trimmed successfully.');
        setLoading(false);
      })
      .catch(error => {
        setMessage('Error trimming video.');
        console.error(error);
        setLoading(false);
      });
  
    return () => {
      console.log("Closing");
    };
  };
  

  // const handleDownload = () => {
  //   const link = document.createElement('a');
  //   link.href = `http://127.0.0.1:5000/uploads/${videoFilename}`;
  //   link.download = 'trimmed_video.mp4';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  const handleDownload = (filename) => {
    const link = document.createElement('a');
    link.href = `http://127.0.0.1:5000/uploads/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          automatically crop the video to the proper aspect ratio, center the video, add subtitles, 
          and add random royalty free background music. If you would like to customize the tool to 
          create higher value clips, we have subscription options available that allow for highly customizable clips.
        </p>

        <form id="trim-form" onSubmit={handleSubmit} encType="multipart/form-data" className='mt-10 flex flex-col gap-4'>
          <div className="form-group">
            <label htmlFor="video-file">1. Upload your full length video file:</label>
            <input type="file" id="video-file" name="video-file" className="form-control-file" />
          </div>
          <div className="form-group flex flex-col gap-2">
            <div className='flex justify-between'>
              <label htmlFor="add-clips">2. Add timestamps for as many clips as you'd like:</label>
              <button type="button" id="add-clips" className="btn btn-primary w-36 self-end" onClick={handleAddClipTimeInput}>
                <FontAwesomeIcon icon={faPlus} /> Add A Clip
              </button>
            </div>
            {clipInputs}
          </div>
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="trim-button">3. Build your clips:</label>
            <button type="submit" id="trim-button" className="btn btn-primary w-36 self-start">
              <FontAwesomeIcon icon={faHammer} /> Build Clips
            </button>
          </div>
        </form>

        {message && <p>{message}</p>}
        {loading && <ClipLoader color="#123abc" css={override} size={50} id="loading-icon"/>}
        {/* {videoFilename && (
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
        )} */}
        <div className='flex flex-col gap-4'>
        {videoFilenames.map(filename => (
          <div key={filename} className="border border-black border-solid">
            <h2>Trimmed Video: {filename}</h2>
            <video width="152" height="270" controls>
              <source src={`http://127.0.0.1:5000/uploads/${filename}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <br />
            <button onClick={() => handleDownload(filename)} className="btn btn-primary">
              Download {filename}
            </button>
          </div>
        ))}
        </div>

      </header>
    </div>
  );
}

export default Tool;

