import './App.css';

import { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const [message, setMessage] = useState('');
  const [videoFilename, setVideoFilename] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from submitting normally

    const formData = new FormData(event.target); // create a FormData object from the form data
    setLoading(true);
    axios.post('http://127.0.0.1:5000/trim', formData)
      .then(response => {
        setVideoFilename(response.data.file);
        setMessage('Video trimmed successfully.');
        setLoading(false);
      })
      .catch(error => {
        setMessage('Error trimming video.');
        console.error(error);
        setLoading(false);
      });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `http://127.0.0.1:5000/uploads/${videoFilename}`;
    link.download = 'trimmed_video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Trimmerr</h1>
        <form id="trim-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="video-file">Select a video file:</label>
            <input type="file" id="video-file" name="video-file" className="form-control-file" />
          </div>
          <div className="form-group">
            <label htmlFor="start-time">Start time (in seconds):</label>
            <input type="text" id="start-time" name="start-time" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End time (in seconds):</label>
            <input type="text" id="end-time" name="end-time" className="form-control" />
          </div>
         <button type="submit" id="trim-button" className="btn btn-primary">Trim Video</button>
        </form>
        {message && <p>{message}</p>}
        {loading && <ClipLoader color="#123abc" css={override} size={50} />}
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

export default App;
