import React from 'react';

function ColorSwatch() {
  const themes = {
    'light': {
      'primary': 'bg-light-primary',
      'secondary': 'bg-light-secondary',
      'text': 'bg-light-text'
    },
    'dark': {
      'primary': 'bg-dark-primary',
      'secondary': 'bg-dark-secondary',
      'text': 'bg-dark-text'
    },
  };

  return (
    <div className="flex">
      {Object.entries(themes).map(([theme, themeColors]) => (
        <div key={theme} className="m-4">
          <h2 className="text-lg mb-2 capitalize">{theme} theme</h2>
          {Object.entries(themeColors).map(([colorName, colorClass]) => (
            <div key={colorName} className="flex items-center mb-2">
              <div className={`${colorClass} w-20 h-20 mr-2 rounded`}></div>
              <span className="capitalize">{colorName}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ColorSwatch;
