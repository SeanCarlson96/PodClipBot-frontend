import React, { useState, useEffect } from "react";
import { Tooltip } from 'bootstrap';

function PremiumMusic({formData, music}) {

  // const [musicDuration, setMusicDuration] = useState(100);
  const [musicDuration, setMusicDuration] = useState(formData?.musicDuration);
  const handleMusicDurationChange = (e) => {
    setMusicDuration(e.target.value);
  };
  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => new Tooltip(tooltip));
  }, []);
  return (
    <>
        <div className="music-duration flex gap-2 items-center premium-plan-input">
          <label htmlFor="musicDuration">Music Duration (%):</label>
          <span
            className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="The percentage of the video length you would like music to play for"
          >?</span>
          <input
            className="form-control border border-secondary w-auto"
            type="number"
            id="musicDuration"
            name="musicDuration"
            min="1"
            max="100"
            value={musicDuration}
            onChange={handleMusicDurationChange}
            disabled={!music}
          />
        </div>
    </>
  )
}

export default PremiumMusic