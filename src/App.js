// import './App.css';

// import { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [message, setMessage] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault(); // prevent the form from submitting normally

//     const formData = new FormData(event.target); // create a FormData object from the form data
//     axios.post('http://127.0.0.1:5000/trim', formData)
//       .then(response => {
//         setMessage(response.data.message);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Trimmer</h1>
//       <form id="trim-form" onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label htmlFor="video-file">Select a video file:</label>
//           <input type="file" id="video-file" name="video-file" className="form-control-file" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="start-time">Start time (in seconds):</label>
//           <input type="text" id="start-time" name="start-time" className="form-control" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="end-time">End time (in seconds):</label>
//           <input type="text" id="end-time" name="end-time" className="form-control" />
//         </div>
//         <button type="submit" id="trim-button" className="btn btn-primary">Trim Video</button>
//       </form>
//       {message && <p>{message}</p>}
//       </header>
//     </div>
//   );
// }


// export default App;

import './App.css';

import { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [videoURL, setVideoURL] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from submitting normally

    const formData = new FormData(event.target); // create a FormData object from the form data
    axios.post('http://127.0.0.1:5000/trim', formData, { responseType: 'blob' })
      .then(response => {
        const file = new Blob([response.data], { type: 'video/mp4' });
        const url = URL.createObjectURL(file);
        setVideoURL(url);
        setMessage('Video trimmed successfully.');
      })
      .catch(error => {
        setMessage('Error trimming video.');
        console.error(error);
      });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoURL;
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
        {videoURL && (
          <div>
            <h2>Trimmed Video</h2>
            <video width="152" height="270" controls>
              <source src={videoURL} type="video/mp4" />
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
