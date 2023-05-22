import React from "react";

function BaseWatermark({watermark, setWatermark, watermarkOpen, setWatermarkOpen}) {

  const handleWatermarkToggle = () => {
    if(watermark === true) {
      if (watermarkOpen) {setWatermarkOpen(false)}
    }
    setWatermark(!watermark);
  };

  return (
      <div className="form-check form-switch flex gap-2 w-36 base-plan-input">
        <input
          className="form-check-input cursor-pointer border border-secondary"
          type="checkbox"
          id="watermarkToggle"
          name="watermarkToggle"
          checked={watermark}
          onChange={handleWatermarkToggle}
        />
        <label className="form-check-label" htmlFor="watermarkToggle">
          Watermark
        </label>
      </div>

  );
}

export default BaseWatermark;
