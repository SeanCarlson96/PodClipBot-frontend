import './App.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './components/Header';
import Footer from './components/Footer';

import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./Routes";
import UserContext from './contexts/UserContext';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);

  const bgColor = theme === 'dark' ? 'bg-dark-primary' : 'bg-light-primary';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-light-text';

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
        <div className={`${bgColor} ${textColor}`}>
          <Router>
              <Header />
                <div className="App p-3">
                    <Routing />
                </div>
              <Footer />
          </Router>
        </div>
    </UserContext.Provider>
  );
}

export default App;
