import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function EditSubscription({ submitHandler, setMessage }) {
    const [newSubscription, setNewSubscription] = useState("");
    const { user, setUser } = useContext(UserContext);
    const [validationMessage, setValidationMessage] = useState("");
  
    const handleUpdate = () => {
      if (!newSubscription.trim()) { // checks if the new subscription is blank or only contains spaces
          setValidationMessage("New subscription cannot be blank");
          return;
      }
      axios
        .patch(`http://127.0.0.1:5000/api/users/${user.id}`, {
          subscription: newSubscription,
        })
        .then((response) => {
          console.log("Subscription updated successfully");
          setUser({ ...user, subscription: newSubscription });
          setMessage("Subscription updated successfully");
          submitHandler();
        })
        .catch((err) => {
          console.error("Error updating subscription: ", err);
          setValidationMessage("Error updating subscription");
        });
    };
  return (
    <div>

        <button onClick={submitHandler}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>

        <div className="pt-3 flex flex-col gap-2">
            <div className="flex flex-col gap-1 mb-2">
                <label>Current Subscription:</label>
                <p>{user.subscription}</p>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="subscription">New Subscription:</label>
                <input
                    type="text"
                    className="form-control"
                    id="subscription"
                    placeholder="New Subscription"
                    value={newSubscription}
                    onChange={(e) => setNewSubscription(e.target.value)}
                    required
                />
            </div>

            <p className="text-red-500">{validationMessage}</p>

            <button className="btn btn-primary w-36" onClick={handleUpdate}>Update</button>
        </div>

    </div>
    
  )
}

export default EditSubscription