import React, { useState } from "react";
import BaseSubtitles from "../base-plan-components/BaseSubtitles";
import BaseMusic from "../base-plan-components/BaseMusic";
import BaseWatermark from "../base-plan-components/BaseWatermark";
import AdvancedSubtitles from "./AdvancedSubtitles";
import AdvancedMusic from "./AdvancedMusic";

const AdvancedPlan = ({formData}) => {
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
    <div className="feature-contain flex flex-col gap-4">
        <input
          type="hidden"
          name="subscription"
          value="advanced"
        />
      {/* Subtitles */}
      <div className="flex flex-wrap gap-2">
        <div className="form-check form-switch flex gap-2 items-center w-full">
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
        <BaseSubtitles formData={formData} subtitles={subtitles} subtitlesBackground={subtitlesBackground} setSubtitlesBackground={setSubtitlesBackground} />
        <AdvancedSubtitles formData={formData} subtitles={subtitles} subtitlesBackground={subtitlesBackground} />
      </div>

      {/* Music */}
      <div className="flex flex-wrap gap-2">
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
          <label htmlFor="volume">Volume:</label>
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
        <AdvancedMusic formData={formData} music={music}/>
      </div>

      {/* Watermark */}
      <div className="flex flex-col gap-2">
        <BaseWatermark watermark={watermark} setWatermark={setWatermark} />
      </div>

    </div>
  );
};

export default AdvancedPlan;
