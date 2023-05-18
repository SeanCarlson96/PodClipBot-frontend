import React, { useState } from "react";
import BaseSubtitles from "./BaseSubtitles";
import BaseMusic from "./BaseMusic";
import BaseWatermark from "./BaseWatermark";

const BasePlan = ({ formData }) => {
  // const [subtitles, setSubtitles] = useState(true);
  // const [music, setMusic] = useState(true);
  // const [volume, setVolume] = useState(50);
  // const [subtitlesBackground, setSubtitlesBackground] = useState(false);
  // const [watermark, setWatermark] = useState(true);


  const [subtitles, setSubtitles] = useState(formData?.subtitlesToggle);
  const [music, setMusic] = useState(formData?.musicToggle);
  const [volume, setVolume] = useState(formData?.volume);
  const [subtitlesBackground, setSubtitlesBackground] = useState(formData?.subtitleBackgroundToggle);
  const [watermark, setWatermark] = useState(formData?.watermarkToggle);

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
    <div className="flex flex-col gap-4">

      <input
          type="hidden"
          name="subscription"
          value="base"
      />

        {/* Subtitles */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 items-center">
        <div className="form-check form-switch flex gap-2 items-center w-full">
            <input
                className="form-check-input"
                type="checkbox"
                id="subtitlesToggle"
                name="subtitlesToggle"
                checked={subtitles}
                onChange={handleSubtitlesToggle} />
            <label className="form-check-label" htmlFor="subtitlesToggle">
                Subtitles
            </label>
        </div>
        {/* <BaseSubtitles subtitles={subtitles} /> */}

        <BaseSubtitles formData={formData} subtitles={subtitles} subtitlesBackground={subtitlesBackground} setSubtitlesBackground={setSubtitlesBackground} />
      </div>

        {/* Music */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 items-center">
        <div className="form-check form-switch flex gap-2 items-center w-full">
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
        <BaseMusic formData={formData} music={music} />
      </div>

        {/* Watermark */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 items-center">
        <BaseWatermark watermark={watermark} setWatermark={setWatermark}/>
      </div>

    </div>
  );
};

export default BasePlan;
