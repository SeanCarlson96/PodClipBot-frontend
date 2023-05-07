import React, { useState } from "react";

const AdvancedPlan = () => {
  const [subtitles, setSubtitles] = useState(true);
  const [music, setMusic] = useState(true);
  const [volume, setVolume] = useState(50);
  const [watermark, setWatermark] = useState(true);
  const [subtitleColor, setSubtitleColor] = useState("#ffffff");
  const [subtitleBackground, setSubtitleBackground] =
    useState(false);
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [subtitleBackgroundColor, setSubtitleBackgroundColor] =
    useState("#000000");
  const [musicChoice, setMusicChoice] = useState("random");
  const [customMusic, setCustomMusic] = useState(null);
  const [musicFade, setMusicFade] = useState(true);
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [subtitlePosition, setSubtitlePosition] = useState("Bottom");
  const [subtitleSegmentLength, setSubtitleSegmentLength] = useState(0);

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

  const handleSubtitleBackgroundToggle = () => {
    setSubtitleBackground(!subtitleBackground);
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

  const handleCustomMusicUpload = (e) => {
    setCustomMusic(e.target.files[0]);
  };

  const handleMusicFadeToggle = () => {
    setMusicFade(!musicFade);
  };

  const handleStrokeWidthChange = (e) => {
    setStrokeWidth(e.target.value);
  };

  const handleStrokeColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  const handleSubtitlePositionChange = (e) => {
    setSubtitlePosition(e.target.value);
  };

  const handleSubtitleSegmentLengthChange = (e) => {
    setSubtitleSegmentLength(e.target.value);
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
        <div className="font-select flex gap-2 items-center base-plan-input">
          <label htmlFor="font">Font:</label>
          <select
            className="form-select"
            id="font"
            name="font"
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
            name="fontSize"
            min="8"
            max="48"
            value={fontSize}
            onChange={handleFontSizeChange}
            disabled={!subtitles}
          />
        </div>
        <div className="subtitle-color flex gap-2 items-center base-plan-input">
          <label htmlFor="subtitleColor">Color:</label>
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
        <div className="subtitle-background-color flex gap-2 items-center advanced-plan-input">
          <label htmlFor="subtitleBackgroundColor">
            Background Color:
          </label>
          <input
            className="form-control form-control-color"
            type="color"
            id="subtitleBackgroundColor"
            name="subtitleBackgroundColor"
            value={subtitleBackgroundColor}
            disabled={!subtitles || !subtitleBackground}
            onChange={handleSubtitleBackgroundColorChange}
          />
        </div>
        <div className="subtitle-stroke-width flex gap-2 items-center advanced-plan-input">
          <label htmlFor="strokeWidth">Font Stroke Width:</label>
          <input 
            className="form-control"
            type="number" 
            id="strokeWidth" 
            name="strokeWidth" 
            min="0" 
            max="10"
            value={strokeWidth}
            disabled={!subtitles} 
            onChange={handleStrokeWidthChange}
          />
        </div>
        <div className="subtitle-stroke-color flex gap-2 items-center advanced-plan-input">
          <label htmlFor="strokeColor">Font Stroke Color:</label>
          <input
            className="form-control form-control-color"
            type="color"
            id="strokeColor"
            name="strokeColor"
            value={strokeColor}
            disabled={!subtitles}
            onChange={handleStrokeColorChange}
          />
        </div>
        <div className="subtitle-position flex gap-2 items-center advanced-plan-input">
          <label htmlFor="subtitlePosition">Subtitle Position:</label>
          <select
            className="form-select"
            id="subtitlePosition"
            name="subtitlePosition"
            value={subtitlePosition}
            disabled={!subtitles}
            onChange={handleSubtitlePositionChange}
          >
            <option>Top</option>
            <option>Center</option>
            <option>Bottom</option>
          </select>
        </div>
        <div className="subtitle-segment-length flex gap-2 items-center advanced-plan-input">
          <label>
            Subtitle Segment Length:
          </label>
          <input
            className="form-control"
            type="number"
            id="subtitleSegmentLength"
            name="subtitleSegmentLength"
            min="4"
            max="10"
            value={subtitleSegmentLength}
            disabled={!subtitles}
            onChange={handleSubtitleSegmentLengthChange}
          />
        </div>
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
        <div className="music-choice flex gap-2 items-center base-plan-input">
          <label htmlFor="musicChoice">
            Music Choice:
          </label>
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
        <div className="custom-music-upload flex gap-2 items-center advanced-plan-input">
          <label htmlFor="customMusic">Custom Music Upload:</label>
          <input
            type="file"
            id="customMusic"
            name="customMusic"
            accept="audio/*"
            value={customMusic}
            disabled={!music}
            onChange={handleCustomMusicUpload}
          />
        </div>
        <div className="music-fade form-check form-switch flex gap-2 items-center advanced-plan-input">
          <label className="form-check-label" htmlFor="musicFade">Fade In, Fade Out</label>
          <input
            className="form-check-input"
            type="checkbox"
            id="musicFade"
            name="musicFade"
            value={musicFade}
            disabled={!music}
            onChange={handleMusicFadeToggle}
          />
        </div>
      </div>

      {/* Watermark */}
      <div className="flex flex-col gap-2">
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

export default AdvancedPlan;
