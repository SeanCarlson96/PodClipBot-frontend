
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function DeleteAccount({ setMessage, submitHandler }) {
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    // User confirmation before deleting
    axios
      .delete(`http://127.0.0.1:5000/delete-account`, { data: { user_id: user.id }})
      .then((response) => {
        console.log("Account deleted successfully");
        setMessage("Account deleted successfully");
        setUser(null);  // Clear user data
        handleClose();  // Close modal
      })
      .catch((err) => {
        console.error("Error deleting account: ", err);
      });
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Delete My Account
      </Button> */}
           <div>
         <button onClick={submitHandler}>
             <FontAwesomeIcon icon={faArrowLeft} /> Back
         </button>
         <div className="pt-3 flex flex-col gap-3">

             <p>We hate to see you go, but we will be sure to automatically cancel any existing subscriptions on your account if you do choose to leave.</p>

             <button className="btn btn-primary w-44" onClick={handleShow}>Delete My Account</button>
         </div>
     </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for your support of PodClipBot.com. We hope you found value in our service and we would love to have you back anytime :)</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete My Account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAccount;
