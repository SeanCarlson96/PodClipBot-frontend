import React, {useState,useEffect} from 'react'
import { Tooltip } from 'bootstrap';

function AdvancedMusic({music}) {
    // const [customMusic, setCustomMusic] = useState('');
    const [musicFade, setMusicFade] = useState(true);

    // const handleCustomMusicUpload = (e) => {
    //   setCustomMusic(e.target.files[0]);
    // };
  
    const handleMusicFadeToggle = () => {
      setMusicFade(!musicFade);
    };
    useEffect(() => {
      const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltips.forEach((tooltip) => new Tooltip(tooltip));
    }, []);
  
  return (
    <>
        <div className="custom-music-upload flex gap-2 items-center advanced-plan-input">
          <label className="customMusic flex gap-2" htmlFor="music-file">Custom Music Upload:
                
              </label>
              <span
                  className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-300 text-gray-700"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Accepted file types: MP3, WAV, AAC, FLAC, M4A, OGG, OPUS, ALAC, AIFF, WMA"
                >?</span>
            <input type="file" id="music-file" name="music-file" className="form-control-file" disabled={!music} 
            // onChange={handleCustomMusicUpload}
            />
        </div>

        <div className="music-fade form-check form-switch flex gap-2 items-center advanced-plan-input">
          <input
            className="form-check-input"
            type="checkbox"
            id="musicFade"
            name="musicFade"
            checked={musicFade}
            disabled={!music}
            onChange={handleMusicFadeToggle}
          />
          <label className="form-check-label" htmlFor="musicFade">
            Fade In, Fade Out
          </label>
        </div>
    </>
  )
}

export default AdvancedMusic