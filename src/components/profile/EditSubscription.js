import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../contexts/UserContext";

function EditSubscription({ submitHandler, setMessage }) {
    // const backendURL = process.env.REACT_APP_BACKEND_URL;
    // const [newSubscription, setNewSubscription] = useState("");
    // const { user, setUser } = useContext(UserContext);
    // const [validationMessage, setValidationMessage] = useState("");

    const { user } = useContext(UserContext);
    const [validationMessage] = useState("");
    const manageStripeLink = process.env.REACT_APP_MANAGE_STRIPE_LINK;

    const handleClick = () => {
      window.open(manageStripeLink, '_blank');
    };

  return (
    <div>

        <button onClick={submitHandler}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>

        <div className="pt-3 flex flex-col gap-2">
            <div className="flex flex-col gap-1 mb-2">
                <label>Current Subscription:</label>
                <p>
                {
                  user.subscription.charAt(0).toUpperCase() +
                  user.subscription.slice(1).toLowerCase()
                }
                </p>
            </div>

            <button className="btn btn-primary" onClick={handleClick}>
              Manage Subscription With Stripe
              <FontAwesomeIcon className="ml-2" icon={faUpRightFromSquare} />
            </button>

            <p className="text-red-500">{validationMessage}</p>

        </div>

    </div>
    
  )
}

export default EditSubscription