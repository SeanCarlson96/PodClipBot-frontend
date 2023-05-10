import React, { useState } from "react";

function PremiumWatermark({ watermark }) {
//   const [customWatermark, setCustomWatermark] = useState(null);
  // const [watermarkPosition, setWatermarkPosition] = useState("top-left");
  const [watermarkPositionHorizontal, setWatermarkPositionHorizontal] = useState("center");
  const [watermarkPositionVertical, setWatermarkPositionVertical] = useState(35);
  const [watermarkSize, setWatermarkSize] = useState(50);
  const [watermarkDuration, setWatermarkDuration] = useState(10);
  const [watermarkOpacity, setWatermarkOpacity] = useState(100);

//   const handleCustomWatermarkUpload = (e) => {
//     setCustomWatermark(e.target.files[0]);
//   };

  // const handleWatermarkPositionChange = (e) => {
  //   setWatermarkPosition(e.target.value);
  // };
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
      {/* <div className="watermark-position flex gap-2 items-center premium-plan-input">
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
      </div> */}


      <div className="watermark-position flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkPositionHorizontal">Watermark Horizontal Position:</label>
        <select
          className="form-select"
          id="watermarkPositionHorizontal"
          name="watermarkPositionHorizontal"
          value={watermarkPositionHorizontal}
          disabled={!watermark}
          onChange={handleWatermarkPositionHorizontalChange}
        >
          <option value={'center'}>Center</option>
          <option value={'left'}>Left</option>
          <option value={'right'}>Right</option>
        </select>
      </div>
      <div className="watermark-position flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkPositionVertical">Watermark Vertical Position (%):</label>
        <input
          className="form-control"
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

      {/* <div className="custom-watermark-upload flex gap-2 items-center premium-plan-input">
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
      </div> */}
      <div className="custom-watermark-upload flex gap-2 items-center premium-plan-input">
          <label className="customWatermark flex gap-2" htmlFor="watermark-file">Custom Watermark Upload:
                <span
                  className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-300 text-gray-700"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Accepted file types: JPG, JPEG, PNG"
                >?</span>
              </label>
            <input type="file" id="watermark-file" name="watermark-file" className="form-control-file" disabled={!watermark} 
            // onChange={handleCustomWatermarkUpload}
            />
        </div>
      <div className="watermark-size flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkSize">Watermark Size: Hieght</label>
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
      <div className="watermark-opacity flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkOpacity">Watermark Opacity (%):</label>
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
      <div className="watermark-duration flex gap-2 items-center premium-plan-input">
        <label htmlFor="watermarkDuration">Watermark Duration:</label>
        <input
          className="form-control"
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
