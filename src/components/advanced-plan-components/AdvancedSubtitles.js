import React, { useState, useEffect } from "react";
import { Tooltip } from 'bootstrap';

function AdvancedSubtitles({ formData, subtitles, subtitlesBackground }) {
  const [subtitleBackgroundColor, setSubtitleBackgroundColor] = useState(formData?.subtitleBackgroundColor);
  const [strokeWidth, setStrokeWidth] = useState(formData?.strokeWidth);
  const [strokeColor, setStrokeColor] = useState(formData?.strokeColor);
  // const [subtitlePosition, setSubtitlePosition] = useState("Bottom");
  const [subtitlePositionHorizontal, setSubtitlePositionHorizontal] = useState(formData?.subtitlePositionHorizontal);
  const [subtitlePositionVertical, setSubtitlePositionVertical] = useState(formData?.subtitlePositionVertical);
  const [subtitleSegmentLength, setSubtitleSegmentLength] = useState(formData?.subtitleSegmentLength);

  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => new Tooltip(tooltip));
  }, []);

  const handleSubtitleBackgroundColorChange = (e) => {
    setSubtitleBackgroundColor(e.target.value);
  };

  const handleStrokeWidthChange = (e) => {
    setStrokeWidth(e.target.value);
  };

  const handleStrokeColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  // const handleSubtitlePositionChange = (e) => {
  //   setSubtitlePosition(e.target.value);
  // };
  const handleSubtitlePositionHorizontalChange = (e) => {
    setSubtitlePositionHorizontal(e.target.value);
  };
  const handleSubtitlePositionVerticalChange = (e) => {
    setSubtitlePositionVertical(e.target.value);
  };

  const handleSubtitleSegmentLengthChange = (e) => {
    setSubtitleSegmentLength(e.target.value);
  };
  return (
    <>
      <div className="subtitle-background-color flex gap-2 items-center advanced-plan-input">
        <label htmlFor="subtitleBackgroundColor">Background Color:</label>
        <input
          className="form-control form-control-color border border-secondary"
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
          <span
            className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Font Stroke Width refers to the thickness of the outline around each character of text"
          >?</span>
        <input
          className="form-control border border-secondary w-auto"
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
          className="form-control form-control-color border border-secondary"
          type="color"
          id="strokeColor"
          name="strokeColor"
          value={strokeColor}
          disabled={!subtitles}
          onChange={handleStrokeColorChange}
        />
      </div>
      {/* <div className="subtitle-position flex gap-2 items-center advanced-plan-input">
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
      </div> */}
      
      <div className="subtitle-position flex gap-2 items-center advanced-plan-input">
        <label htmlFor="subtitlePositionHorizontal">Subtitle Horizontal Position:</label>
        <select
          className="form-select border border-secondary w-auto"
          id="subtitlePositionHorizontal"
          name="subtitlePositionHorizontal"
          value={subtitlePositionHorizontal}
          disabled={!subtitles}
          onChange={handleSubtitlePositionHorizontalChange}
        >
          <option value={'Center'}>Center</option>
          <option value={'Left'}>Left</option>
          <option value={'Right'}>Right</option>
        </select>
      </div>
      <div className="subtitle-position flex gap-2 items-center advanced-plan-input">
        <label htmlFor="subtitlePositionVertical">Subtitle Vertical Position:</label>
        <span
            className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Vertical Position refers to the percentage of the video height where the subtitle will be placed"
          >?</span>
        <input
          className="form-control border border-secondary w-auto"
          type="number"
          id="subtitlePositionVertical"
          name="subtitlePositionVertical"
          min="5"
          max="100"
          value={subtitlePositionVertical}
          disabled={!subtitles}
          onChange={handleSubtitlePositionVerticalChange}
        />
      </div>

      <div className="subtitle-segment-length flex gap-2 items-center advanced-plan-input">
        <label>Subtitle Segment Length:</label>
        <span
            className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="
            Subtitle Segment Length refers to the maximum number of characters a 
            subtitle segment will contain before it's broken into a new segment. 
            Subtitle segments are automatically separated based on long pauses or 
            a change in speakers (if diarization is enabled), but setting the segment 
            character length is another way control when segments are cut off."
          >?</span>
        <input
          className="form-control border border-secondary w-auto"
          type="number"
          id="subtitleSegmentLength"
          name="subtitleSegmentLength"
          min="5"
          max="15"
          value={subtitleSegmentLength}
          disabled={!subtitles}
          onChange={handleSubtitleSegmentLengthChange}
        />
      </div>
    </>
  );
}

export default AdvancedSubtitles;
