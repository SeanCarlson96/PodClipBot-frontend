import React, { useState } from "react";

const PremiumPlan = () => {
  const [subtitles, setSubtitles] = useState(true);
  const [music, setMusic] = useState(true);
  const [volume, setVolume] = useState(50);
  const [watermark, setWatermark] = useState(true);
  const [subtitleColor, setSubtitleColor] = useState("#ffffff");
  const [subtitleBackground, setSubtitleBackground] = useState(false);
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

  const [customWatermark, setCustomWatermark] = useState(null);
  const [whisperXModel, setWhisperXModel] = useState("model1");
  const [watermarkPosition, setWatermarkPosition] = useState("top-left");
  const [watermarkSize, setWatermarkSize] = useState(50);
  const [watermarkDuration, setWatermarkDuration] = useState(10);
  const [watermarkOpacity, setWatermarkOpacity] = useState(100);
  const [musicDuration, setMusicDuration] = useState(60);

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

  const handleCustomWatermarkUpload = (e) => {
    setCustomWatermark(e.target.files[0]);
  };

  const handleWhisperXModelChange = (e) => {
    setWhisperXModel(e.target.value);
  };

  const handleWatermarkPositionChange = (e) => {
    setWatermarkPosition(e.target.value);
  };

  const handleWatermarkSizeChange = (e) => {
    setWatermarkSize(e.target.value);
  };

  const handleWatermarkDurationChange = (e) => {
    setWatermarkDuration(e.target.value);
  };

  const handleWatermarkOpacityChange = (e) => {
    setWatermarkOpacity(e.target.value);
  };

  const handleMusicDurationChange = (e) => {
    setMusicDuration(e.target.value);
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
          <label
            className="form-check-label"
            htmlFor="subtitleBackgroundToggle"
          >
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
          <label htmlFor="subtitleBackgroundColor">Background Color:</label>
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
          <label>Subtitle Segment Length:</label>
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

        <div className="whisperx-model flex gap-2 items-center premium-plan-input">
          <label htmlFor="whisperXModel">WhisperX Model:</label>
          <select
            className="form-select"
            id="whisperXModel"
            name="whisperXModel"
            value={whisperXModel}
            onChange={handleWhisperXModelChange}
            disabled={!subtitles}
          >
            <option value="model1">Model 1</option>
            <option value="model2">Model 2</option>
            <option value="model3">Model 3</option>
          </select>
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
          <label htmlFor="musicChoice">Music Choice:</label>
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
          <label className="form-check-label" htmlFor="musicFade">
            Fade In, Fade Out
          </label>
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
        <div className="music-duration flex gap-2 items-center premium-plan-input">
          <label htmlFor="musicDuration">Music Duration:</label>
          <input
            className="form-control"
            type="number"
            id="musicDuration"
            name="musicDuration"
            min="1"
            max="180"
            value={musicDuration}
            onChange={handleMusicDurationChange}
            disabled={!music}
          />
        </div>
      </div>

      {/* Watermark */}
      <div className="flex flex-wrap gap-2">
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
        <div className="watermark-position flex gap-2 items-center premium-plan-input">
          <label htmlFor="watermarkPosition">Watermark Position:</label>
          <select
            className="form-select"
            id="watermarkPosition"
            name="watermarkPosition"
            value={watermarkPosition}
            onChange={handleWatermarkPositionChange}
            disabled={!watermark}
          >
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>
        <div className="custom-watermark-upload flex gap-2 items-center premium-plan-input">
          <label htmlFor="customWatermark">Custom Watermark:</label>
          <input
            type="file"
            id="customWatermark"
            name="customWatermark"
            accept="image/*"
            value={customWatermark}
            onChange={handleCustomWatermarkUpload}
            disabled={!watermark}
          />
        </div>
        <div className="watermark-size flex gap-2 items-center premium-plan-input">
          <label htmlFor="watermarkSize">Watermark Size:</label>
          <input
            className="form-control"
            type="number"
            id="watermarkSize"
            name="watermarkSize"
            min="0"
            max="100"
            value={watermarkSize}
            onChange={handleWatermarkSizeChange}
            disabled={!watermark}
          />
        </div>
        <div className="watermark-duration flex gap-2 items-center premium-plan-input">
          <label htmlFor="watermarkDuration">Watermark Duration:</label>
          <input
            className="form-control"
            type="number"
            id="watermarkDuration"
            name="watermarkDuration"
            min="1"
            max="60"
            value={watermarkDuration}
            onChange={handleWatermarkDurationChange}
            disabled={!watermark}
          />
        </div>
        <div className="watermark-opacity flex gap-2 items-center premium-plan-input">
          <label htmlFor="watermarkOpacity">Watermark Opacity:</label>
          <input
            className="form-control"
            type="number"
            id="watermarkOpacity"
            name="watermarkOpacity"
            min="0"
            max="100"
            value={watermarkOpacity}
            onChange={handleWatermarkOpacityChange}
            disabled={!watermark}
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumPlan;
