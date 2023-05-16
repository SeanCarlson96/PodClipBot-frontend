
import { NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ThemedComponent from './ThemedComponent';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const textColor = theme === 'dark' ? 'navbar-dark' : 'navbar-light';
  const logo = theme === 'dark' ? 'PodClipBot.com (white).png' : 'PodClipBot.com3.png';

  const handleLogout = () => {
    // Clear the user data from the global state and local storage
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('videoFiles');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${textColor}`}>

      <div className="flex justify-between items-center w-full px-5">

        <a className="navbar-brand flex" href="/">
          {/* <img src={process.env.PUBLIC_URL + '/PodClipBot.com3.png'} alt="logo" className="logo w-44" /> */}
          <img src={process.env.PUBLIC_URL + '/' + logo} alt="logo" className="logo w-44" />
        </a>

        <ul className="navbar-nav flex flex-row space-x-2">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="font-bold text-gray-400"
              exact='true'
              to="/"
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
            <li className="nav-item">
              <ThemedComponent />
            </li>
        </ul>

      </div>

    </nav>
  );
};

export default Header;
