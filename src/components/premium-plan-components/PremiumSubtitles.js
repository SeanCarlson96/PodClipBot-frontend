import React, { useState } from "react";

function PremiumSubtitles({ formData, subtitles}) {
  // const [diarization, setDiarization] = useState(false);
  // const [secondSpeakerColor, setSecondSpeakerColor] = useState("#FFFF00");
  // const [thirdSpeakerColor, setThirdSpeakerColor] = useState("#0000FF");
  // const [fourthSpeakerColor, setFourthSpeakerColor] = useState("#008000");
  // const [fifthSpeakerColor, setFifthSpeakerColor] = useState("#FF0000");

  const [diarization, setDiarization] = useState(formData?.diarizationToggle);
  const [secondSpeakerColor, setSecondSpeakerColor] = useState(formData?.secondSpeakerColor);
  const [thirdSpeakerColor, setThirdSpeakerColor] = useState(formData?.thirdSpeakerColor);
  const [fourthSpeakerColor, setFourthSpeakerColor] = useState(formData?.fourthSpeakerColor);
  const [fifthSpeakerColor, setFifthSpeakerColor] = useState(formData?.fifthSpeakerColor);

  const handleSecondSpeakerColorChange = (e) => {
    setSecondSpeakerColor(e.target.value);
  }
  const handleThirdSpeakerColorChange = (e) => {
    setThirdSpeakerColor(e.target.value);
  }
  const handleFourthSpeakerColorChange = (e) => {
    setFourthSpeakerColor(e.target.value);
  }
  const handleFifthSpeakerColorChange = (e) => {
    setFifthSpeakerColor(e.target.value);
  }
  
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
            disabled={!subtitles}
            onChange={handleDiarizationToggle}
          />
          <label className="form-check-label" htmlFor="diarizationToggle">
            Diarization
          </label>
        </div>
        <div className="second-speaker-color flex gap-2 items-center premium-plan-input">
          <label htmlFor="secondSpeakerColor">Additional Speaker Colors:</label>
          <input
            className="form-control form-control-color"
            type="color"
            id="secondSpeakerColor"
            name="secondSpeakerColor"
            value={secondSpeakerColor}
            disabled={!subtitles || !diarization}
            onChange={handleSecondSpeakerColorChange}
          />
          <input
            className="form-control form-control-color"
            type="color"
            id="thirdSpeakerColor"
            name="thirdSpeakerColor"
            value={thirdSpeakerColor}
            disabled={!subtitles || !diarization}
            onChange={handleThirdSpeakerColorChange}
          />
          <input
            className="form-control form-control-color"
            type="color"
            id="fourthSpeakerColor"
            name="fourthSpeakerColor"
            value={fourthSpeakerColor}
            disabled={!subtitles || !diarization}
            onChange={handleFourthSpeakerColorChange}
          />
          <input
            className="form-control form-control-color"
            type="color"
            id="fifthSpeakerColor"
            name="fifthSpeakerColor"
            value={fifthSpeakerColor}
            disabled={!subtitles || !diarization}
            onChange={handleFifthSpeakerColorChange}
          />
        </div>
    </>
  )
}

export default PremiumSubtitles