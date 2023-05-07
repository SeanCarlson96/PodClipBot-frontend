import React, { useState } from "react";

const FreePlan = () => {
  const [subtitles, setSubtitles] = useState(true);
  const [music, setMusic] = useState(true);
  const [volume, setVolume] = useState(50);

  const handleSubtitlesToggle = () => {
    setSubtitles(!subtitles);
  };

  const handleMusicToggle = () => {
    setMusic(!music);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="flex gap-5 items-center">
        <input
          type="hidden"
          name="subscription"
          value="none"
        />
      <div className="form-check form-switch flex gap-2 items-center">
        <input
          className="form-check-input"
          type="checkbox"
          id="subtitlesToggle"
          name="subtitlesToggle"
          checked={subtitles}
          onChange={handleSubtitlesToggle}
        />
        <label className="form-check-label" htmlFor="subtitlesToggle">
          Subtitles
        </label>
      </div>

      <div className="form-check form-switch flex gap-2 items-center">
        <label className="form-check-label" htmlFor="musicToggle">
          Music
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          id="musicToggle"
          name="musicToggle"
          checked={music}
          onChange={handleMusicToggle}
        />
      </div>

      <div className="volume-control flex gap-2 items-center">
        <label htmlFor="volume">Music Volume:</label>
        <input
          className="volume-input"
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          disabled={!music}
        />
        <span>{volume}</span>
      </div>
    </div>
  );
};

export default FreePlan;
