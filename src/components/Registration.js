import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
          console.log('Passwords do not match');
          return;
        }
    
        try {
          const response = await axios.post('http://127.0.0.1:5000/register', formData);
          console.log(response.data);
          navigate('/login');
        } catch (error) {
          console.error('Registration error:', error);
          setMessage('Registration failed. Please try again.')
        }
      };

      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h2 className="text-center my-4">Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter name"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full mt-3">
                  Register
                </button>
                {message && (
                    <div className="mt-4 text-center text-red-500">
                        <p>{message}</p>
                    </div>
                )}
              </form>
            </div>
          </div>
        </div>
      );
}

export default Registration;