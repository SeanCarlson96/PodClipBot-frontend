import React, {useState, useEffect} from 'react'

function BaseMusic({formData, music}) {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    // const [musicChoice, setMusicChoice] = useState("random");
    const [musicChoice, setMusicChoice] = useState(formData?.musicChoice);
    const [files, setFiles] = useState([]);
    const [selectedMusic, setSelectedMusic] = useState(null);
  
    useEffect(() => {
      const fetchMusicFiles = async () => {
        try {
          // const response = await fetch('http://127.0.0.1:5000/api/music_files');
          const response = await fetch(backendURL + '/api/music_files');
          const data = await response.json();
          setFiles(data);
        } catch (error) {
          console.error('Error fetching music files:', error);
        }
      };
    
      fetchMusicFiles();
    }, []);

    const handleMusicChoiceChange = (e) => {
        const selectedMusic = e.target.value;
        setSelectedMusic(selectedMusic === "random" ? null : selectedMusic);
        setMusicChoice(e.target.value);
      };
      const getMusicUrl = () => {
        if (!selectedMusic) return null;
        // return `http://127.0.0.1:5000/api/music/${selectedMusic}`;
        return `${backendURL}/api/music/${selectedMusic}`;
      };

  return (
    <>
        <div className="music-choice flex flex-wrap gap-2 items-center base-plan-input">
            <label className="" htmlFor="musicChoice">Music Choice:</label>
            <select
            className="form-select border border-secondary w-auto max-w-full"
            id="musicChoice"
            name="musicChoice"
            value={musicChoice}
            onChange={handleMusicChoiceChange}
            disabled={!music}
            >
            <option value="random">Random</option>
            {files.map((file, index) => (
                <option key={index} value={file}>
                {file}
                </option>
            ))}
            </select>
        </div>
        {selectedMusic && (
            <div className="music-player flex flex-wrap gap-2 items-center base-plan-input">
            <label>Preview Music Choice:</label>
            <audio className="h-10 border border-secondary rounded-full" key={selectedMusic} 
            disabled={!music} controls src={getMusicUrl()} />
            </div>
        )}
    </>
  )
}

export default BaseMusic