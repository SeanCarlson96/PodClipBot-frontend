import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function EditUsername({ user, submitHandler, setMessage }) {
  const [newUsername, setNewUsername] = useState("");
  const { setUser } = useContext(UserContext);
  const [validationMessage, setValidationMessage] = useState("");

  const handleUpdate = () => {
    if (!newUsername.trim()) { // checks if the new username is blank or only contains spaces
        setValidationMessage("New username cannot be blank");
        return;
    }
    axios
      .patch(`http://127.0.0.1:5000/api/users/${user.id}`, {
        username: newUsername,
      })
      .then((response) => {
        console.log("Username updated successfully");
        setUser({ ...user, username: newUsername });
        setMessage("Username updated successfully");
        submitHandler();
      })
      .catch((err) => {
        console.error("Error updating username: ", err);
        setValidationMessage("Error updating username");
      });
  };

  return (
    <div>

        <button onClick={submitHandler}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>

        <div className="pt-3 flex flex-col gap-2">
            <div className="flex flex-col gap-1 mb-2">
                <label>Current Username:</label>
                <p>{user.username}</p>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="username">New Username:</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                />
            </div>

            <p className="text-red-500">{validationMessage}</p>

            <button className="btn btn-primary w-36" onClick={handleUpdate}>Update</button>
        </div>

    </div>
  );
}

export default EditUsername;
