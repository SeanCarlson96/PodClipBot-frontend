import React, { useState } from 'react'
import FontDropdown from "../FontDropdown";

function BaseSubtitles({ formData, subtitles, subtitlesBackground, setSubtitlesBackground }) {

  // const [subtitleColor, setSubtitleColor] = useState("#ffffff");
  // const [font, setFont] = useState("Arial");
  // const [fontSize, setFontSize] = useState(15);
  // const [subtitleBackground, setSubtitleBackground] = useState(false);

  // console.log(formData);
  const [subtitleColor, setSubtitleColor] = useState(formData?.subtitleColor);
  const [font, setFont] = useState(formData?.font);
  const [fontSize, setFontSize] = useState(formData?.fontSize);
  // const [subtitleBackground, setSubtitleBackground] = useState(false);

  const handleSubtitleColorChange = (e) => {
    setSubtitleColor(e.target.value);
  };

  const handleFontChange = (e) => {
    setFont(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleSubtitleBackgroundToggle = () => {
    setSubtitlesBackground(!subtitlesBackground);
  };

  return (
    <>
        <div className="font-select flex gap-2 items-center base-plan-input">
            <label htmlFor="font">Font:</label>
            <FontDropdown
                value={font}
                onChange={handleFontChange}
                disabled={!subtitles} />
        </div>
        <div className="font-size-select flex gap-2 items-center base-plan-input">
            <label className="w-36" htmlFor="fontSize">Font Size:</label>
            <input
                className="form-control"
                type="number"
                id="fontSize"
                name="fontSize"
                min="5"
                max="22"
                value={fontSize}
                onChange={handleFontSizeChange}
                disabled={!subtitles} />
        </div>
        <div className="subtitle-color flex gap-2 items-center base-plan-input">
            <label htmlFor="subtitleColor">Subtitle Color:</label>
            <input
                className="form-control form-control-color"
                type="color"
                id="subtitleColor"
                name="subtitleColor"
                value={subtitleColor}
                onChange={handleSubtitleColorChange}
                disabled={!subtitles} />
        </div>
        <div className="form-check form-switch flex gap-2 items-center base-plan-input">
            <label className="form-check-label" htmlFor="subtitleBackgroundToggle">
                Background
            </label>
            <input
                className="form-check-input"
                type="checkbox"
                id="subtitleBackgroundToggle"
                name="subtitleBackgroundToggle"
                value={subtitlesBackground}
                onChange={handleSubtitleBackgroundToggle}
                disabled={!subtitles} />
        </div>
    </>
  )
}

export default BaseSubtitles