
import Header from './components/Header';
import Footer from './components/Footer';
import Tool from './components/Tool';

import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Routing from "./Routes";
import UserContext from './contexts/UserContext';
import { ThemeContext } from './contexts/ThemeContext';

// ToolWithRouting component
const ToolWithRouting = () => {
  const location = useLocation();
  return (
    <div className={location.pathname === '/tool' ? '' : 'hidden'}>
      <Tool />
    </div>
  );
}


function App() {
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);
  // const location = useLocation();
  const bgColor = theme === 'dark' ? 'bg-dark-primary' : 'bg-light-primary';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-light-text';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAccessToken = localStorage.getItem('access_token');

    if (storedUser && storedAccessToken) {
      if(storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      }
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
                    {/* <Tool style={{ display: location.pathname === '/tool' ? 'block' : 'none' }} /> */}
                    <ToolWithRouting />
                </div>
              <Footer />
          </Router>
        </div>
    </UserContext.Provider>
  );
}

export default App;
