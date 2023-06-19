import React, { useState, useEffect } from "react";
import { Tooltip } from "bootstrap";

function PremiumWatermark({ formData, watermark, freeplan }) {
  const [watermarkPositionHorizontal, setWatermarkPositionHorizontal] = useState(formData?.watermarkPositionHorizontal);
  const [watermarkPositionVertical, setWatermarkPositionVertical] = useState(formData?.watermarkPositionVertical);
  const [watermarkSize, setWatermarkSize] = useState(formData?.watermarkSize);
  const [watermarkDuration, setWatermarkDuration] = useState(formData?.watermarkDuration);
  const [watermarkOpacity, setWatermarkOpacity] = useState(formData?.watermarkOpacity);
  
  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => new Tooltip(tooltip));
  }, []);

//   const handleCustomWatermarkUpload = (e) => {
//     setCustomWatermark(e.target.files[0]);
//   };

  const handleWatermarkPositionHorizontalChange = (e) => {
    setWatermarkPositionHorizontal(e.target.value);
  };
  const handleWatermarkPositionVerticalChange = (e) => {
    setWatermarkPositionVertical(e.target.value);
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

  return (
    <>
      {/* {freeplan && (
        <p>You are on the Free Plan</p>
      )} */}
      <div className="custom-watermark-upload flex flex-wrap gap-2 items-center premium-plan-input pro-plan-input">
          <label className="customWatermark flex gap-2" htmlFor="watermark-file">
            Custom Watermark Upload:
              </label>
              <span
                  className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Accepted file types: JPEG, PNG, GIF, BMP, SVG, TIFF, WebP, HEIF, ICO"
                >?</span>
            <input type="file" id="watermark-file" name="watermark-file" className="form-control-file" disabled={!watermark || freeplan} 
            // onChange={handleCustomWatermarkUpload}
            />
      </div>
      <div className="watermark-position flex gap-2 items-center premium-plan-input pro-plan-input">
        <label htmlFor="watermarkPositionHorizontal">Horizontal Position:</label>
        <select
          className="form-select border border-secondary w-auto"
          id="watermarkPositionHorizontal"
          name="watermarkPositionHorizontal"
          value={watermarkPositionHorizontal}
          disabled={!watermark || freeplan}
          onChange={handleWatermarkPositionHorizontalChange}
        >
          <option value={'Center'}>Center</option>
          <option value={'Left'}>Left</option>
          <option value={'Right'}>Right</option>
        </select>
      </div>
      <div className="watermark-position flex gap-2 items-center premium-plan-input pro-plan-input">
        <label htmlFor="watermarkPositionVertical">Vertical Position (%):</label>
        <span
          className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Vertical Position refers to the percentage of the video height where the watermark will be placed"
        >?</span>
        <input
          className="form-control border border-secondary w-auto"
          type="number"
          id="watermarkPositionVertical"
          name="watermarkPositionVertical"
          min="0"
          max="100"
          value={watermarkPositionVertical}
          disabled={!watermark || freeplan}
          onChange={handleWatermarkPositionVerticalChange}
        />
      </div>

      <div className="watermark-size flex gap-2 items-center premium-plan-input pro-plan-input">
        <label htmlFor="watermarkSize">Watermark Size:</label>
        <span
          className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="The watermark size is the height of the watermark relative to the video height"
        >?</span>
        <input
          className="form-control border border-secondary w-auto"
          type="number"
          id="watermarkSize"
          name="watermarkSize"
          min="0"
          max="500"
          value={watermarkSize}
          onChange={handleWatermarkSizeChange}
          disabled={!watermark || freeplan}
        />
      </div>
      <div className="watermark-opacity flex gap-2 items-center premium-plan-input pro-plan-input">
        <label htmlFor="watermarkOpacity">Watermark Opacity (%):</label>
        <span
          className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="A value of 0% means the watermark is completely transparent, or invisible, while a value of 100% means the watermark is completely opaque, or fully visible"
        >?</span>
        <input
          className="form-control border border-secondary w-auto"
          type="number"
          id="watermarkOpacity"
          name="watermarkOpacity"
          min="0"
          max="100"
          value={watermarkOpacity}
          onChange={handleWatermarkOpacityChange}
          disabled={!watermark || freeplan}
        />
      </div>
      <div className="watermark-duration flex gap-2 items-center premium-plan-input pro-plan-input">
        <label htmlFor="watermarkDuration">Watermark Duration:</label>
        <span
          className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="The watermark duration is the percentage of the video length you would like the watermark to appear for"
        >?</span>
        <input
          className="form-control border border-secondary w-auto"
          type="number"
          id="watermarkDuration"
          name="watermarkDuration"
          min="0"
          max="100"
          value={watermarkDuration}
          onChange={handleWatermarkDurationChange}
          disabled={!watermark || freeplan}
        />
      </div>
    </>
  );
}

export default PremiumWatermark;
