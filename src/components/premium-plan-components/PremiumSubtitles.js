import React, { useState } from "react";

function PremiumSubtitles({subtitles}) {
  const [diarization, setDiarization] = useState(false);  
  
  const handleDiarizationToggle = () => {
    setDiarization(!diarization);
  };

  // const [whisperXModel, setWhisperXModel] = useState("model1");
  // const handleWhisperXModelChange = (e) => {
  //   setWhisperXModel(e.target.value);
  // };

  return (
    <>  
        {/* <div className="whisperx-model flex gap-2 items-center premium-plan-input">
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
        </div> */}
        <div className="form-check form-switch flex gap-2 items-center premium-plan-input">
          <input
            className="form-check-input"
            type="checkbox"
            id="diarizationToggle"
            name="diarizationToggle"
            checked={diarization}
            onChange={handleDiarizationToggle}
          />
          <label className="form-check-label" htmlFor="diarizationToggle">
            Diarization
          </label>
        </div>
    </>
  )
}

export default PremiumSubtitles