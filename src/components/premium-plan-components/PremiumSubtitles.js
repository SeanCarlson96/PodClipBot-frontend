import React, { useState, useEffect } from "react";
import { Tooltip } from 'bootstrap';

function PremiumSubtitles({ formData, subtitles}) {
  const [diarization, setDiarization] = useState(formData?.diarizationToggle);
  const [secondSpeakerColor, setSecondSpeakerColor] = useState(formData?.secondSpeakerColor);
  const [thirdSpeakerColor, setThirdSpeakerColor] = useState(formData?.thirdSpeakerColor);
  const [fourthSpeakerColor, setFourthSpeakerColor] = useState(formData?.fourthSpeakerColor);
  const [fifthSpeakerColor, setFifthSpeakerColor] = useState(formData?.fifthSpeakerColor);

  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => new Tooltip(tooltip));
  }, []);

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
            className="form-check-input cursor-pointer border border-secondary"
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
          <span
            className="cursor-pointer inline-flex items-center justify-center h-6 w-6 rounded-full bg-light-secondary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Turning on Diarization enables speaker idenitification and allows you to customize the subtitle color based on who is speaking"
          >?</span>
        </div>
        <div className="second-speaker-color flex flex-wrap gap-2 items-center premium-plan-input">
          <label htmlFor="secondSpeakerColor">Additional Speaker Colors:</label>

          <div className="flex gap-2">
            <input
              className="form-control form-control-color border border-secondary"
              type="color"
              id="secondSpeakerColor"
              name="secondSpeakerColor"
              value={secondSpeakerColor}
              disabled={!subtitles || !diarization}
              onChange={handleSecondSpeakerColorChange}
            />
            <input
              className="form-control form-control-color border border-secondary"
              type="color"
              id="thirdSpeakerColor"
              name="thirdSpeakerColor"
              value={thirdSpeakerColor}
              disabled={!subtitles || !diarization}
              onChange={handleThirdSpeakerColorChange}
            />
            <input
              className="form-control form-control-color border border-secondary"
              type="color"
              id="fourthSpeakerColor"
              name="fourthSpeakerColor"
              value={fourthSpeakerColor}
              disabled={!subtitles || !diarization}
              onChange={handleFourthSpeakerColorChange}
            />
            <input
              className="form-control form-control-color border border-secondary"
              type="color"
              id="fifthSpeakerColor"
              name="fifthSpeakerColor"
              value={fifthSpeakerColor}
              disabled={!subtitles || !diarization}
              onChange={handleFifthSpeakerColorChange}
            />
          </div>
        </div>
    </>
  )
}

export default PremiumSubtitles