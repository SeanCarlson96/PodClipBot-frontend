import React from "react";

function BaseWatermark({watermark, setWatermark}) {

  const handleWatermarkToggle = () => {
    setWatermark(!watermark);
  };

  return (
    <div className="form-check form-switch flex gap-2 items-center base-plan-input w-full">
      <label className="form-check-label" htmlFor="watermarkToggle">
        Watermark
      </label>
      <input
        className="form-check-input border border-secondary"
        type="checkbox"
        id="watermarkToggle"
        name="watermarkToggle"
        checked={watermark}
        onChange={handleWatermarkToggle}
      />
    </div>
  );
}

export default BaseWatermark;
