import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faArrowRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditUsername from "./EditUsername";
import EditEmail from "./EditEmail";
import EditSubscription from "./EditSubscription";
import EditPassword from "./EditPassword";
import EditDefaultSettings from "./EditDefaultSettings";
import DeleteAccount from "./DeleteAccount";

const ProfileItemBlock = ({ label, userInfo, onClick }) => (
  <button
    className="w-full border-b flex justify-between py-3"
    onClick={onClick}
  >
    <p>{label}</p>
    <div className="flex items-center gap-3">
      <p className="text-gray-400">{userInfo}</p>
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  </button>
);

const Profile = () => {
  const { user } = useContext(UserContext);
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editSubscription, setEditSubscription] = useState(false);
  const [editDefaultSettings, setEditDefaultSettings] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [message, setMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 2000);
      const clearTimer = setTimeout(() => {
        setMessage("");
        setFadeOut(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [message]);

  //to prevent memory leak
  useEffect(() => {
    return () => setMessage("");
  }, []);

  return (
    <div className="flex flex-col gap-1 w-96 mx-auto bg-gray-900 rounded-lg p-4">
      {user ? (
        <>
          <div className="flex justify-between items-center">
            <h1>Profile</h1>
            {editUsername ||
            editEmail ||
            editPassword ||
            editSubscription ||
            editDefaultSettings ||
            deleteAccount ? (
              <FontAwesomeIcon icon={faCog} size="lg" />
            ) : null}
          </div>

          <div className="">
            {editUsername ? (
              <EditUsername
                submitHandler={() => setEditUsername(false)}
                setMessage={setMessage}
              />
            ) : editEmail ||
              editPassword ||
              editSubscription ||
              editDefaultSettings ||
              deleteAccount ? null : (
              <ProfileItemBlock
                label="Username"
                userInfo={user.username}
                onClick={() => setEditUsername(true)}
              />
            )}

            {editEmail ? (
              <EditEmail
                submitHandler={() => setEditEmail(false)}
                setMessage={setMessage}
              />
            ) : editUsername ||
              editPassword ||
              editSubscription ||
              editDefaultSettings ||
              deleteAccount ? null : (
              <ProfileItemBlock
                label="Email"
                userInfo={user.email}
                onClick={() => setEditEmail(true)}
              />
            )}

            {editPassword ? (
              <EditPassword
                submitHandler={() => setEditPassword(false)}
                setMessage={setMessage}
              />
            ) : editUsername ||
              editEmail ||
              editSubscription ||
              editDefaultSettings ||
              deleteAccount ? null : (
              <ProfileItemBlock
                label="Change Password"
                userInfo="********"
                onClick={() => setEditPassword(true)}
              />
            )}

            {editSubscription ? (
              <EditSubscription
                submitHandler={() => setEditSubscription(false)}
                setMessage={setMessage}
              />
            ) : editUsername ||
              editEmail ||
              editPassword ||
              editDefaultSettings ||
              deleteAccount ? null : (
              <ProfileItemBlock
                label="Subscription"
                userInfo={
                  user.subscription.charAt(0).toUpperCase() +
                  user.subscription.slice(1).toLowerCase()
                }
                onClick={() => setEditSubscription(true)}
              />
            )}

            {editDefaultSettings ? (
              <EditDefaultSettings
                submitHandler={() => setEditDefaultSettings(false)}
              />
            ) : editUsername ||
              editEmail ||
              editPassword ||
              editSubscription ||
              deleteAccount ? null : user.subscription === "premium" ? (
              <ProfileItemBlock
                label="Default Clip Settings"
                userInfo="View Presets"
                onClick={() => setEditDefaultSettings(true)}
              />
            ) : null}

            {deleteAccount ? (
              <DeleteAccount
                submitHandler={() => setDeleteAccount(false)}
                setMessage={setMessage}
              />
            ) : editUsername ||
              editEmail ||
              editPassword ||
              editDefaultSettings ||
              editSubscription ? null : (
              <ProfileItemBlock
                label="Delete Account"
                userInfo=
                {<FontAwesomeIcon icon={faTrashCan} />}
                onClick={() => setDeleteAccount(true)}
              />
            )}
          </div>
          {editUsername ||
          editEmail ||
          editPassword ||
          editSubscription ||
          editDefaultSettings ||
          deleteAccount ? null : (
            <p
              className={`mt-3 text-primary text-center ${
                fadeOut ? "fade-out" : ""
              }`}
            >
              {message}
            </p>
          )}
        </>
      ) : (
        <>
          {message ? (
            <p className='text-primary text-center'>
              {message}
            </p>
          ) : (
            <p className='text-center'>Please sign in to view your profile.</p>
          )}

        </>
      )}
    </div>
  );
};

export default Profile;
