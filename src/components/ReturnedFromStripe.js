// ReturnedFromStripe.jsx
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

const ReturnedFromStripe = () => {
  const { setUser } = useContext(UserContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios.get(`${backendURL}/api/getUserById/${userId}`)
      .then(response => {
        setUser(response.data.user);
        navigate('/tool');
      })
      .catch(error => {
        console.error("Error while fetching updated user data:", error);
      });
  }, [setUser, userId, navigate, backendURL]);

  return (
    <div>Loading...</div>
  );
};

export default ReturnedFromStripe;
