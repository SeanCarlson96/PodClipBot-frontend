import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function IssueForm({disableForm}) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [show, setShow] = useState(false);
  const [issue, setIssue] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSuccessMessage(null); // Clear the success message when the modal is closed
  };
  
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(backendURL + "/issues", {
        issue,
        timestamp: new Date().toISOString(),
      });
    
      console.log("Issue submitted successfully");
      console.log(response);

      // Set the success message and clear it after 3 seconds
      setSuccessMessage("Thank you! We're on it - your reported issue helps us enhance our service.");
      setTimeout(() => setSuccessMessage(null), 5000);
      setTimeout(handleClose, 5000);
    } catch (error) {
      console.error("Issue submission failed");
      console.error(error);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow} disabled={disableForm}>
        Report an Issue
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report an Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Describe the issue</Form.Label>
              <Form.Control 
                as="textarea"
                rows={3}
                className="border border-secondary"
                value={issue} 
                onChange={e => setIssue(e.target.value)}
              />
            </Form.Group>
          </Form>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Issue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IssueForm;
