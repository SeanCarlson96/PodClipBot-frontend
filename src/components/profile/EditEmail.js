import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function EditEmail({ submitHandler, setMessage }) {
    const [newEmail, setNewEmail] = useState("");
    const { user, setUser } = useContext(UserContext);
    const [validationMessage, setValidationMessage] = useState("");
  
    const handleUpdate = () => {
      if (!newEmail.trim()) { // checks if the new Email is blank or only contains spaces
          setValidationMessage("New email cannot be blank");
          return;
      }
        // Regular expression for email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailPattern.test(newEmail)) { // checks if the new Email is in a valid format
            setValidationMessage("Please enter a valid email");
            return;
        }
      axios
        .patch(`http://127.0.0.1:5000/api/users/${user.id}`, {
          email: newEmail,
        })
        .then((response) => {
          console.log("Email updated successfully");
          setUser({ ...user, email: newEmail });
          setMessage("Email updated successfully");
          submitHandler();
        })
        .catch((err) => {
          console.error("Error updating email: ", err);
          setValidationMessage("Error updating email");
        });
    };
  return (
    <div>

        <button onClick={submitHandler}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>

        <div className="pt-3 flex flex-col gap-2">
            <div className="flex flex-col gap-1 mb-2">
                <label>Current Email:</label>
                <p>{user.email}</p>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="email">New Email:</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="New Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                />
            </div>

            <p className="text-red-500">{validationMessage}</p>

            <button className="btn btn-primary w-36" onClick={handleUpdate}>Update</button>
        </div>

    </div>
    
  )
}

export default EditEmail