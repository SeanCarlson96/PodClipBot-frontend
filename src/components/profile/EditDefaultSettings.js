import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function EditDefaultSettings({ user, submitHandler, setMessage }) {
  const [newDefaultSettings, setNewDefaultSettings] = useState("");
  const { setUser } = useContext(UserContext);
  const [validationMessage, setValidationMessage] = useState("");

  const handleUpdate = () => {
    if (!newDefaultSettings.trim()) { // checks if the new default settings is blank or only contains spaces
        setValidationMessage("New default settings cannot be blank");
        return;
    }
    axios
      .patch(`http://127.0.0.1:5000/api/users/${user.id}`, {
        defaultSettings: newDefaultSettings,
      })
      .then((response) => {
        console.log("Default Settings updated successfully");
        setUser({ ...user, defaultSettings: newDefaultSettings });
        setMessage("Default Settings updated successfully");
        submitHandler();
      })
      .catch((err) => {
        console.error("Error updating default settings: ", err);
        setValidationMessage("Error updating default settings");
      });
  };

  return (
    <div>

        <button onClick={submitHandler}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>

        <div className="pt-3 flex flex-col gap-2">
            <div className="flex flex-col gap-1 mb-2">
                <label>Current Default Settings:</label>
                <p>{user.defaultSettings}</p>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="defaultSettings">New DefaultSettings:</label>
                <input
                    type="text"
                    className="form-control"
                    id="defaultSettings"
                    placeholder="New DefaultSettings"
                    value={newDefaultSettings}
                    onChange={(e) => setNewDefaultSettings(e.target.value)}
                    required
                />
            </div>

            <p className="text-red-500">{validationMessage}</p>

            <button className="btn btn-primary w-36" onClick={handleUpdate}>Update</button>
        </div>

    </div>
  );
}

export default EditDefaultSettings;
