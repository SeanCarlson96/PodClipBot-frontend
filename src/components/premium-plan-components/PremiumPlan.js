import React, { useState } from "react";
import PremiumSubtitles from "./PremiumSubtitles";
import BaseSubtitles from "../base-plan-components/BaseSubtitles";
import AdvancedSubtitles from "../advanced-plan-components/AdvancedSubtitles";
import BaseMusic from "../base-plan-components/BaseMusic";
import AdvancedMusic from "../advanced-plan-components/AdvancedMusic";
import PremiumMusic from "./PremiumMusic";
import BaseWatermark from "../base-plan-components/BaseWatermark";
import PremiumWatermark from "./PremiumWatermark";

const PremiumPlan = () => {
  const [subtitles, setSubtitles] = useState(true);
  const [music, setMusic] = useState(true);
  const [volume, setVolume] = useState(50);
  const [subtitlesBackground, setSubtitlesBackground] = useState(false);
  const [watermark, setWatermark] = useState(true);

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
          value="premium"
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
        <BaseSubtitles subtitles={subtitles} subtitlesBackground={subtitlesBackground} setSubtitlesBackground={setSubtitlesBackground} />
        <AdvancedSubtitles subtitles={subtitles} subtitlesBackground={subtitlesBackground} />
        <PremiumSubtitles subtitles={subtitles} />
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
        <BaseMusic music={music} />
        <AdvancedMusic music={music}/>
        <PremiumMusic music={music} />
      </div>

      {/* Watermark */}
      <div className="flex flex-wrap gap-2">
        <BaseWatermark watermark={watermark} setWatermark={setWatermark} />
        <PremiumWatermark watermark={watermark} />
      </div>
    </div>
  );
};

export default PremiumPlan;
