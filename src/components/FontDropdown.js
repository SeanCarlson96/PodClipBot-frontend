import React from 'react';
import FONTS from '../fonts';

const FontDropdown = ({ value, onChange, disabled }) => {
  return (
    <select
      className="form-select"
      id="font"
      name="font"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {FONTS.map((font, index) => (
        <option key={index} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
};

export default FontDropdown;
