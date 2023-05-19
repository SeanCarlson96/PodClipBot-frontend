import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import UserSettings from "./UserSettings";

function EditDefaultSettings({ submitHandler }) {

  return (
    <div>

        <button onClick={submitHandler}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>

        <div className="pt-3">

            <UserSettings />

        </div>

    </div>
  );
}

export default EditDefaultSettings;
