import React, { useState } from "react";
import BaseSubtitles from "./BaseSubtitles";
import BaseMusic from "./BaseMusic";
import BaseWatermark from "./BaseWatermark";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const BasePlan = ({ formData }) => {
  const [subtitles, setSubtitles] = useState(formData?.subtitlesToggle);
  const [music, setMusic] = useState(formData?.musicToggle);
  const [volume, setVolume] = useState(formData?.volume);
  const [subtitlesBackground, setSubtitlesBackground] = useState(formData?.subtitleBackgroundToggle);
  const [watermark, setWatermark] = useState(formData?.watermarkToggle);
  const [subtitlesOpen, setSubtitlesOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [watermarkOpen, setWatermarkOpen] = useState(false);

  const handleSubtitlesToggle = () => {
    if(subtitles === true) {
      if (subtitlesOpen) {setSubtitlesOpen(false)}
    }
    setSubtitles(!subtitles);
  };

  const handleMusicToggle = () => {
    if(music === true) {
      if (musicOpen) {setMusicOpen(false)}
    }
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
          value="base"
      />

      {/* Subtitles */}
      <div className="flex flex-col gap-2 pb-2 border-b border-secondary">
        <div className="flex gap-4">
          <div className="form-check form-switch flex gap-2 w-36">
            <input
              className="form-check-input cursor-pointer border border-secondary"
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
          <div
              // className={`border nav-link ${activeTab === 'subtitles' ? 'active' : ''}`}
              className="w-full flex justify-center cursor-pointer"
              onClick={() => setSubtitlesOpen(!subtitlesOpen)}
              disabled={!subtitles}
            >
              <div className="flex justify-between items-center sm:w-60 gap-2">
                <div>Base Subtitle Settings</div>
                <div>{subtitlesOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</div>
              </div>
          </div>
        </div>

        <div className={`p-2 flex flex-col gap-2 ${subtitlesOpen ? '' : 'hidden'}`}>
        {/* <div className={`m-1 flex flex-col gap-2 overflow-hidden transition-all duration-700 ${subtitlesOpen ? 'max-h-screen' : 'max-h-0'}`}>
         <div 
          className={`p-2 flex flex-col gap-2 transform transition-transform duration-500 ease-in-out 
          ${subtitlesOpen ? 'translate-y-0' : 'translate-y-full'}`}
        > */}
            <BaseSubtitles formData={formData} subtitles={subtitles} subtitlesBackground={subtitlesBackground} setSubtitlesBackground={setSubtitlesBackground} />
        </div>
        

      </div>

      {/* Music */}
      <div className="flex flex-col gap-2 pb-2 border-b border-secondary">
        <div className="flex gap-4">

          <div className="form-check form-switch flex gap-2 w-36">
            <input
              className="form-check-input cursor-pointer border border-secondary"
              type="checkbox"
              id="musicToggle"
              name="musicToggle"
              checked={music}
              onChange={handleMusicToggle}
            />
            <label className="form-check-label" htmlFor="musicToggle">
              Music
            </label>
          </div>

          <div
              // className={`border nav-link ${activeTab === 'subtitles' ? 'active' : ''}`}
              className="w-full flex justify-center cursor-pointer"
              onClick={() => setMusicOpen(!musicOpen)}
              disabled={!music}
            >
              <div className="flex justify-between items-center sm:w-60 gap-2">
                <div>Base Music Settings</div>
                <div>{musicOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</div>
              </div>
          </div>

        </div>

        <div className={`p-2 flex flex-col gap-2 ${musicOpen ? '' : 'hidden'}`}>
          <div className="volume-control flex gap-2 items-center">
            <label htmlFor="volume">Volume:</label>
            <input
              className="volume-input cursor-pointer"
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
      </div>

      {/* Watermark */}
      <div className="flex flex-col gap-2">
        <BaseWatermark watermark={watermark} setWatermark={setWatermark} watermarkOpen={watermarkOpen} setWatermarkOpen={setWatermarkOpen} />
      </div>

    </div>
  );
};

export default BasePlan;
