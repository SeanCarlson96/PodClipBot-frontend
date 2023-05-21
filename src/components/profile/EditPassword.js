import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function EditPassword({ submitHandler, setMessage }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useContext(UserContext);
  const [validationMessage, setValidationMessage] = useState("");

  const handleUpdate = () => {
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setValidationMessage("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationMessage("New password and confirmation do not match");
      return;
    }

    axios
      .post(`http://127.0.0.1:5000/change-password`, {
        user_id: user.id,
        old_password: oldPassword,
        new_password: newPassword,
      })
      .then((response) => {
        console.log("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setMessage("Password updated successfully");
        submitHandler();
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          // Here, we use the message sent back from the server
          setValidationMessage(err.response.data.message);
        } else {
          console.error("Error updating password: ", err);
          setValidationMessage("An unexpected error occurred while updating your password. Please try again later.");
        }
      });
  };

  return (
    <div>
      <button onClick={submitHandler}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      <div className="pt-3 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="oldPassword">Current Password:</label>
          <input
            type="password"
            id="oldPassword"
            className="form-control border border-secondary"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            className="form-control border border-secondary"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control border border-secondary"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <p className="text-red-500">{validationMessage}</p>

        <button className="btn btn-primary w-36" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default EditPassword;
