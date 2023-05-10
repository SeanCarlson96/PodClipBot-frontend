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
import { ThemeProvider } from './ThemeProvider';
import { ThemeContext } from '@emotion/react';

function App() {
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);

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
      <ThemeProvider>
        <Router>
            <Header />
            <div className={`bg-${theme}-primary`}> {/* App p-5 */}
              <Routing />
            </div>
            <Footer />
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
