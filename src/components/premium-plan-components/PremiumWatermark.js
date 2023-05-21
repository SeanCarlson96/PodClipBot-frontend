import React, { useState, useEffect } from "react";
import { Tooltip } from "bootstrap";

function PremiumWatermark({ formData, watermark }) {
//   const [customWatermark, setCustomWatermark] = useState(null);
  // const [watermarkPositionHorizontal, setWatermarkPositionHorizontal] = useState("center");
  // const [watermarkPositionVertical, setWatermarkPositionVertical] = useState(25);
  // const [watermarkSize, setWatermarkSize] = useState(200);
  // const [watermarkDuration, setWatermarkDuration] = useState(100);
  // const [watermarkOpacity, setWatermarkOpacity] = useState(100);

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

      <div className="custom-watermark-upload flex gap-2 items-center premium-plan-input">
          <label className="customWatermark flex gap-2" htmlFor="watermark-file">
            Custom Watermark Upload:
              </label>
              <span
                  className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Accepted file types: JPEG, PNG, GIF, BMP, SVG, TIFF, WebP, HEIF, ICO"
                >?</span>
            <input type="file" id="watermark-file" name="watermark-file" className="form-control-file" disabled={!watermark} 
            // onChange={handleCustomWatermarkUpload}
            />
      </div>
      <div className="watermark-position flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkPositionHorizontal">Watermark Horizontal Position:</label>
        <select
          className="form-select border border-secondary"
          id="watermarkPositionHorizontal"
          name="watermarkPositionHorizontal"
          value={watermarkPositionHorizontal}
          disabled={!watermark}
          onChange={handleWatermarkPositionHorizontalChange}
        >
          <option value={'Center'}>Center</option>
          <option value={'Left'}>Left</option>
          <option value={'Right'}>Right</option>
        </select>
      </div>
      <div className="watermark-position flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkPositionVertical">Watermark Vertical Position (%):</label>
        <input
          className="form-control border border-secondary"
          type="number"
          id="watermarkPositionVertical"
          name="watermarkPositionVertical"
          min="0"
          max="100"
          value={watermarkPositionVertical}
          disabled={!watermark}
          onChange={handleWatermarkPositionVerticalChange}
        />
      </div>

      <div className="watermark-size flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkSize">Watermark Size: Hieght in px</label>
        <input
          className="form-control border border-secondary"
          type="number"
          id="watermarkSize"
          name="watermarkSize"
          min="0"
          max="500"
          value={watermarkSize}
          onChange={handleWatermarkSizeChange}
          disabled={!watermark}
        />
      </div>
      <div className="watermark-opacity flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkOpacity">Watermark Opacity (%):</label>
        <input
          className="form-control border border-secondary"
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
      <div className="watermark-duration flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkDuration">Watermark Duration:</label>
        <input
          className="form-control border border-secondary"
          type="number"
          id="watermarkDuration"
          name="watermarkDuration"
          min="0"
          max="100"
          value={watermarkDuration}
          onChange={handleWatermarkDurationChange}
          disabled={!watermark}
        />
      </div>
    </>
  );
}

export default PremiumWatermark;
