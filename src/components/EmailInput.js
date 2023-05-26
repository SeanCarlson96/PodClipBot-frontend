import React, { useState } from 'react';
import axios from 'axios';
import ReCaptchaV3 from './ReCaptchaV3';

const EmailInput = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [disableForm, setDisableForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://127.0.0.1:5000/forgot-password', { email });
      const response = await axios.post(backendURL + '/forgot-password', { email });
      console.log(response.data);
      setMessage('A password reset link has been sent to your email.');
    } catch (error) {
      setMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4 w-96 mx-auto items-center">
      <h1>Forgot Password</h1>
      <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={disableForm}
        />
        <button className="btn btn-primary w-36" type="submit" disabled={disableForm}>Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
      <ReCaptchaV3 action="forgot_password" setDisableForm={setDisableForm} />
    </div>
  );
};

export default EmailInput;
