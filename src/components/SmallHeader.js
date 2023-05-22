
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useContext} from 'react';
import UserContext from '../contexts/UserContext';
import ThemedComponent from './ThemedComponent';
import { ThemeContext } from '../contexts/ThemeContext';

const SmallHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const textColor = theme === 'dark' ? 'navbar-dark' : 'navbar-light';
  const logo = theme === 'dark' ? 'PodClipBot.com (white).png' : 'PodClipBot.com3.png';

  const handleLogout = () => {
    // Clear the user data from the global state and local storage
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('videoFiles');
  };

  return (
    <nav className={`navbar navbar-expand-lg flex flex-col ${textColor} w-full`}>

      <div className="flex flex-row justify-between items-center w-full px-3">

        {/* <a className="navbar-brand flex" href="/">
          <img src={process.env.PUBLIC_URL + '/' + logo} alt="logo" className="logo w-44" />
        </a> */}
        <Link className="navbar-brand flex" to="/">
          <img src={process.env.PUBLIC_URL + '/' + logo} alt="logo" className="logo w-44" />
        </Link>

        <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=""
          >
            <FontAwesomeIcon icon={faBars} size='lg' />
          </button>

      </div>

      {isMenuOpen ? (
        <ul className="navbar-nav flex flex-col gap-2 pb-4 pt-2 mx-auto text-center border-b border-secondary w-full">
  
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="font-bold text-gray-400"
              exact='true'
              to="/tool"
            >
              Tool
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="font-bold text-gray-400"
              exact='true'
              to="/subscriptions"
            >
              Subscription
            </NavLink>
          </li>
            {user ? (
              // <div>
              //   <span>Welcome, {user.username}!</span>
              //   <button onClick={handleLogout}>Logout</button>
              // </div>
              <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="font-bold text-gray-400"
                  exact='true'
                  to="/profile"
                >
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                  Profile
                </NavLink>
              </li><li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="font-bold text-gray-400"
                  exact='true'
                  to="/login"
                  onClick={handleLogout}
                >
                  {/* <FontAwesomeIcon icon={faSignOut} /> */}
                  Logout
                </NavLink>
              </li></>
            ) : (
              <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="font-bold text-gray-400"
                  exact='true'
                  to="/registration"
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="font-bold text-gray-400"
                  exact='true'
                  to="/login"
                >
                  Sign In
                </NavLink>
              </li>
              </>
            )}

            <li className="nav-item flex items-center self-center mt-2">
              <ThemedComponent />
            </li>

        </ul>
    ) : null}

    </nav>
  );
};

export default SmallHeader;
