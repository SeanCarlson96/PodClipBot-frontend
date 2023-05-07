import React, { useState } from "react";
import FontDropdown from "./FontDropdown";

const BasePlan = () => {
  const [subtitles, setSubtitles] = useState(true);
  const [music, setMusic] = useState(true);
  const [volume, setVolume] = useState(50);
  const [watermark, setWatermark] = useState(true);
  const [subtitleColor, setSubtitleColor] = useState("#ffffff");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(15);
  const [subtitleBackground, setSubtitleBackground] =
    useState(false);
  const [musicChoice, setMusicChoice] = useState("random");

  const handleSubtitlesToggle = () => {
    setSubtitles(!subtitles);
  };

  const handleMusicToggle = () => {
    setMusic(!music);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleWatermarkToggle = () => {
    setWatermark(!watermark);
  };

  const handleSubtitleColorChange = (e) => {
    setSubtitleColor(e.target.value);
  };

  const handleFontChange = (e) => {
    setFont(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleSubtitleBackgroundToggle = () => {
    setSubtitleBackground(!subtitleBackground);
  };

  const handleMusicChoiceChange = (e) => {
    setMusicChoice(e.target.value);
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
            onChange={handleSubtitlesToggle}
          />
          <label className="form-check-label" htmlFor="subtitlesToggle">
            Subtitles
          </label>
        </div>
        <div className="font-select flex gap-2 items-center base-plan-input">
          <label htmlFor="font">Font:</label>
          <FontDropdown
            value={font}
            onChange={handleFontChange}
            disabled={!subtitles}
          />
        </div>
        <div className="font-size-select flex gap-2 items-center base-plan-input">
          <label className="w-36" htmlFor="fontSize">Font Size:</label>
          <input
            className="form-control"
            type="number"
            id="fontSize"
            name="fontSize"
            min="5"
            max="22"
            value={fontSize}
            onChange={handleFontSizeChange}
            disabled={!subtitles}
          />
        </div>
        <div className="subtitle-color flex gap-2 items-center base-plan-input">
          <label htmlFor="subtitleColor">Subtitle Color:</label>
          <input
            className="form-control form-control-color"
            type="color"
            id="subtitleColor"
            name="subtitleColor"
            value={subtitleColor}
            onChange={handleSubtitleColorChange}
            disabled={!subtitles}
          />
        </div>
        <div className="form-check form-switch flex gap-2 items-center base-plan-input">
          <label className="form-check-label" htmlFor="subtitleBackgroundToggle">
            Background
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="subtitleBackgroundToggle"
            name="subtitleBackgroundToggle"
            value={subtitleBackground}
            onChange={handleSubtitleBackgroundToggle}
            disabled={!subtitles}
          />
        </div>
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
        <div className="music-choice flex gap-2 items-center base-plan-input">
          <label className="w-48" htmlFor="musicChoice">Music Choice:</label>
          <select
            className="form-select"
            id="musicChoice"
            name="musicChoice"
            value={musicChoice}
            onChange={handleMusicChoiceChange}
            disabled={!music}
          >
            <option value="random">Random</option>
            <option value="file1">File 1</option>
            <option value="file2">File 2</option>
            <option value="file3">File 3</option>
          </select>
        </div>
      </div>

        {/* Watermark */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 items-center">
        <div className="form-check form-switch flex gap-2 items-center base-plan-input w-full">
          <label className="form-check-label" htmlFor="watermarkToggle">
            Watermark
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="watermarkToggle"
            name="watermarkToggle"
            checked={watermark}
            onChange={handleWatermarkToggle}
          />
        </div>
      </div>

    </div>
  );
};

export default BasePlan;
