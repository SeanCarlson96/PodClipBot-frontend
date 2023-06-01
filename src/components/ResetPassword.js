import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReCaptchaV3 from './ReCaptchaV3';

const ResetPassword = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const [disableForm, setDisableForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    try {
      // Replace with your actual backend endpoint and pass the token from the URL as a parameter
      // const response = await axios.post('http://127.0.0.1:5000/reset-password', { password, token });
      const response = await axios.post(backendURL + '/reset-password', { password, token });
      setMessage(response.data.message);
      // Redirect the user to the login page after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4 w-96 mx-auto items-center">
      <h1>Reset Password</h1>
      <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={disableForm}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={disableForm}
        />
        <button className="btn btn-primary w-36" type="submit" disabled={disableForm}>Reset Password</button>
        <ReCaptchaV3 action="reset_password" setDisableForm={setDisableForm} />
      </form>
      {message && <p className='text-center'>{message}</p>}
    </div>
  );
};

export default ResetPassword;
