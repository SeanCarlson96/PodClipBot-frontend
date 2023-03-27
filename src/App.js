import './App.css';

import { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from submitting normally

    const formData = new FormData(event.target); // create a FormData object from the form data
    axios.post('http://127.0.0.1:5000/trim', formData)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Trimmer</h1>
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
      </header>
    </div>
  );
}


export default App;
