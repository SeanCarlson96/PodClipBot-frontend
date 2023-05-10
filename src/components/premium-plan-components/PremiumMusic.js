import React, { useState } from "react";

function PremiumMusic({music}) {

  const [musicDuration, setMusicDuration] = useState(100);
  const handleMusicDurationChange = (e) => {
    setMusicDuration(e.target.value);
  };
  return (
    <>
        <div className="music-duration flex gap-2 items-center premium-plan-input">
          <label htmlFor="musicDuration">Music Duration (%):</label>
          <input
            className="form-control"
            type="number"
            id="musicDuration"
            name="musicDuration"
            min="1"
            max="100"
            value={musicDuration}
            onChange={handleMusicDurationChange}
            disabled={!music}
          />
        </div>
    </>
  )
}

export default PremiumMusic