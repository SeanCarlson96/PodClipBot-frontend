import React, { useState } from "react";

const AdvancedPlan = () => {
  const [subtitles, setSubtitles] = useState(true);
  const [music, setMusic] = useState(true);
  const [volume, setVolume] = useState(50);
  const [watermark, setWatermark] = useState(true);
  const [subtitleColor, setSubtitleColor] = useState("#ffffff");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [subtitleBackgroundColor, setSubtitleBackgroundColor] =
    useState("#000000");
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

  const handleSubtitleBackgroundColorChange = (e) => {
    setSubtitleBackgroundColor(e.target.value);
  };

  const handleMusicChoiceChange = (e) => {
    setMusicChoice(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Subtitles */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 items-center border">
        <div className="form-check form-switch flex gap-2 items-center">
          <input
            className="form-check-input"
            type="checkbox"
            id="subtitlesToggle"
            checked={subtitles}
            onChange={handleSubtitlesToggle}
          />
          <label className="form-check-label" htmlFor="subtitlesToggle">
            Subtitles
          </label>
        </div>
        <div className="font-select flex gap-2 items-center base-plan-input">
          <label htmlFor="font">Font:</label>
          <select
            className="form-select"
            id="font"
            value={font}
            onChange={handleFontChange}
            disabled={!subtitles}
          >
            <option>Arial</option>
            <option>Helvetica</option>
            <option>Times New Roman</option>
            <option>Verdana</option>
            <option>Courier New</option>
          </select>
        </div>
        <div className="font-size-select flex gap-2 items-center base-plan-input">
          <label className="w-36" htmlFor="fontSize">
            Font Size:
          </label>
          <input
            className="form-control"
            type="number"
            id="fontSize"
            min="8"
            max="48"
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
            value={subtitleColor}
            onChange={handleSubtitleColorChange}
            disabled={!subtitles}
          />
        </div>
        <div className="subtitle-background-color flex gap-2 items-center base-plan-input">
          <label htmlFor="subtitleBackgroundColor">
            Subtitle Background Color:
          </label>
          <input
            className="form-control form-control-color"
            type="color"
            id="subtitleBackgroundColor"
            value={subtitleBackgroundColor}
            onChange={handleSubtitleBackgroundColorChange}
            disabled={!subtitles}
          />
        </div>
        <div className="subtitle-stroke-width flex gap-2 items-center advanced-plan-input">
          <label className="w-96" htmlFor="strokeWidth">Subtitle Font Stroke Width:</label>
          <input 
            className="form-control"
            type="number" 
            id="strokeWidth" 
            min="0" 
            max="10"
            disabled={!subtitles} 
          />
        </div>
        <div className="subtitle-stroke-color flex gap-2 items-center advanced-plan-input">
          <label htmlFor="strokeColor">Subtitle Font Stroke Color:</label>
          <input
            className="form-control form-control-color"
            type="color"
            id="strokeColor"
            disabled={!subtitles}
          />
        </div>
        <div className="subtitle-position flex gap-2 items-center advanced-plan-input">
          <label className="w-44" htmlFor="subtitlePosition">Subtitle Position:</label>
          <select
            className="form-select"
            id="subtitlePosition"
            disabled={!subtitles}
          >
            <option>Top</option>
            <option>Center</option>
            <option>Bottom</option>
          </select>
        </div>
        <div className="subtitle-background-color flex gap-2 items-center advanced-plan-input">
          <label htmlFor="subtitleBackgroundColor">
            Subtitle Background Color:
          </label>
          <input
            className="form-control form-control-color"
            type="color"
            id="subtitleBackgroundColor"
            disabled={!subtitles}
          />
        </div>
        <div className="subtitle-segment-length border advanced-plan-input">
          <label htmlFor="subtitleSegmentLength">
            Subtitle Segment Length:
          </label>
          <input
            className="form-control"
            type="number"
            id="subtitleSegmentLength"
            min="4"
            max="10"
            disabled={!subtitles}
          />
        </div>
      </div>

      {/* Music */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 items-center">
        <div className="form-check form-switch flex gap-2 items-center">
          <label className="form-check-label" htmlFor="musicToggle">
            Music
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="musicToggle"
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
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            disabled={!music}
          />
          <span>{volume}</span>
        </div>
        <div className="music-choice flex gap-2 items-center base-plan-input">
          <label className="w-48" htmlFor="musicChoice">
            Music Choice:
          </label>
          <select
            className="form-select"
            id="musicChoice"
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
        <div className="custom-music-upload flex gap-2 items-center advanced-plan-input">
          <label htmlFor="customMusic">Custom Music Upload:</label>
          <input
            type="file"
            id="customMusic"
            accept="audio/*"
            disabled={!music}
          />
        </div>
        <div className="form-check form-switch music-fade flex gap-2 items-center advanced-plan-input">
          <label className="form-check-label" htmlFor="musicFade">Music Fade In and Out:</label>
          <input
            className="form-check-input"
            type="checkbox"
            id="musicFade"
            disabled={!music}
          />
        </div>
      </div>

      {/* Watermark */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 items-center">
        <div className="form-check form-switch flex gap-2 items-center base-plan-input">
          <label className="form-check-label" htmlFor="watermarkToggle">
            Watermark
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="watermarkToggle"
            checked={watermark}
            onChange={handleWatermarkToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedPlan;
