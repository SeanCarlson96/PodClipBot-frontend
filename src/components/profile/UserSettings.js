import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import FONTS from "../../fonts";
import SETTINGS_CONFIG from "./settingsConfig";

// Assume these options are defined
const FONT_OPTIONS = FONTS;
const MUSIC_OPTIONS = ["Random"];
const HORIZONTAL_POSITIONS = ["Center", "Left", "Right"];

function UserSettings() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const { user, setUser } = useContext(UserContext);
  const [settings, setSettings] = useState({});
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchMusicFiles = async () => {
      try {
        // const response = await fetch('http://127.0.0.1:5000/api/music_files');
        const response = await fetch(backendURL + '/api/music_files');
        const data = await response.json();
        MUSIC_OPTIONS.push(...data);
      } catch (error) {
        console.error('Error fetching music files:', error);
      }
    };
  
    fetchMusicFiles();
  }, [backendURL]);

  useEffect(() => {
    if (user) {
      setSettings(user.defaultSettings);
    }
  }, [user]);

  const handleEdit = (key) => {
    setEditing(key);
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    if (JSON.stringify(user.defaultSettings) !== JSON.stringify(settings)) {
      // axios.patch(`http://127.0.0.1:5000/api/users/${user.id}`, {
      axios.patch(`${backendURL}/api/users/${user.id}`, {
          defaultSettings: settings,
        })
        .then((response) => {
          console.log("Default Settings updated successfully");
          console.log(response.data);
          setUser({ ...user, defaultSettings: settings });
          setEditing(null);
        })
        .catch((err) => {
          console.error("Error updating default settings: ", err);
          // If the server returned a message, display that
          if (err.response && err.response.data && err.response.data.message) {
            console.log(err.response.data.message);
          } else {
            // Else, display a generic error message
            console.log("Error updating default settings");
          }
          setEditing(null);
        })
    } else {
      console.log("No changes in default settings.");
      setEditing(null);
    }
};

  return (
    <div className="flex flex-col gap-2 mb-5">

  {Object.keys(settings)
    .sort((a, b) => SETTINGS_CONFIG[a].order - SETTINGS_CONFIG[b].order)
    .map((key) => (
      <div key={key} className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">

          <label>{SETTINGS_CONFIG[key].label}:</label>
          {editing === key ? (
            // Handle different input types
            SETTINGS_CONFIG[key].type === 'boolean' ? (
              <input
                type="checkbox"
                className="form-check-input border border-secondary"
                checked={settings[key]}
                onChange={(e) => handleChange(key, e.target.checked)}
              />
            ) : SETTINGS_CONFIG[key].type === 'number' ? (
              <input
                type="number"
                className="form-control border border-secondary"
                value={settings[key]}
                min={SETTINGS_CONFIG[key].min}
                max={SETTINGS_CONFIG[key].max}
                onChange={(e) => handleChange(key, Number(e.target.value))}
              />
            ) : SETTINGS_CONFIG[key].type === 'select' ? (
              <select
                className="form-control border border-secondary"
                value={settings[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              >
                <option disabled>Select...</option>
                {(key === 'font' ? FONT_OPTIONS :
                  key === 'musicChoice' ? MUSIC_OPTIONS :
                  HORIZONTAL_POSITIONS).map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : SETTINGS_CONFIG[key].type === 'color' ? (
              <input
                type="color"
                className="form-control form-control-color border border-secondary"
                value={settings[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="form-control border border-secondary"
                value={settings[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            )
          ) : (
            // <span className="text-gray-400">{settings[key].toString()}</span>
            <span className="text-gray-500">{settings[key].toString().charAt(0).toUpperCase() + settings[key].toString().slice(1)}</span>

          )}
        </div>

        {editing === key ? (
          <FontAwesomeIcon className="cursor-pointer" icon={faCheck} onClick={() => handleSave(key)} />
        ) : (
          <FontAwesomeIcon className="cursor-pointer" icon={faEdit} onClick={() => handleEdit(key)} />
        )}

      </div>
  ))}

</div>



  );
}

export default UserSettings;
