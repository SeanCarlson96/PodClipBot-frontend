import React, { useState, useEffect } from 'react';

const FontDropdown = ({ value, onChange, disabled }) => {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    const fetchFonts = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/fonts');
      const data = await response.json();
      setFonts(data);
    };

    fetchFonts();
  }, []);

  return (
    <select
      className="form-select"
      id="font"
      name="font"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {fonts.map((font, index) => (
        <option key={index} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
};

export default FontDropdown;