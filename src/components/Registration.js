import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Registration = () => {
  const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (formData) => {

    if (formData.password !== formData.confirmPassword) {
      return { isValid: false, errorMessage: 'Passwords do not match' };
    }

    return { isValid: true, errorMessage: '' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validateForm(formData);
    if (!validationResult.isValid) {
      setMessage(validationResult.errorMessage);
      return;
    }
    setMessage('');
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', formData);
      console.log(response.data);
      setSuccessMessage('Registration successful. Redirecting to Sign in page...');
      setTimeout(() => {
        navigate('/login');
      }, 2800); 
    } catch (error) {
      console.error('Registration error:', error);
      // Check if the error response contains a message, and display it
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-96 mx-auto items-center">

          <h1>Register</h1>

          <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit}>

              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter name"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

            <button type="submit" className="btn btn-primary w-36">Register</button>

          </form>

          {loading && (
            <div className="flex justify-center">
              <ClipLoader color="#123abc" size={50} id="loading-icon" />
            </div>
          )}

          {message && (<p className="text-red-500">{message}</p>)}
          {successMessage && (<p className="text-green-500">{successMessage}</p>)}

    </div>
  );
}

export default Registration;