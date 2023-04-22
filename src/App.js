import './App.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './components/Header';
import Footer from './components/Footer';

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./Routes";
import UserContext from './contexts/UserContext';

function App() {
  const [user, setUser] = useState(null);

  // console.log(user)

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAccessToken = localStorage.getItem('access_token');

    if (storedUser && storedAccessToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSetUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      <Router>
          <Header />
        <div className="App">
          <Routing />
        </div>
          <Footer />
      </Router>
    </UserContext.Provider>
  );
}
export default App;
