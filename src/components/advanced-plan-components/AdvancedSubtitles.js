import React, { useState } from "react";

function AdvancedSubtitles({ subtitles, subtitlesBackground }) {
  const [subtitleBackgroundColor, setSubtitleBackgroundColor] =
    useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [subtitlePosition, setSubtitlePosition] = useState("Bottom");
  const [subtitleSegmentLength, setSubtitleSegmentLength] = useState(0);

  const handleSubtitleBackgroundColorChange = (e) => {
    setSubtitleBackgroundColor(e.target.value);
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
    <>
      <div className="subtitle-background-color flex gap-2 items-center advanced-plan-input">
        <label htmlFor="subtitleBackgroundColor">Background Color:</label>
        <input
          className="form-control form-control-color"
          type="color"
          id="subtitleBackgroundColor"
          name="subtitleBackgroundColor"
          value={subtitleBackgroundColor}
          disabled={!subtitles || !subtitlesBackground}
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
    </>
  );
}

export default AdvancedSubtitles;
