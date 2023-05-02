
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Clear the user data from the global state and local storage
    setUser(null);
    localStorage.removeItem('access_token');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-1">
      <div className="container-fluid d-flex justify-content-between">
        <a className="navbar-brand pl-4" href="/">
          <img src={process.env.PUBLIC_URL + '/PodClipBot.com3.png'} alt="logo" className="logo w-44" />
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
                  to="/login"
                >
                  <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </li><li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="font-bold text-gray-400"
                  exact='true'
                  to="/login"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOut} />
                </NavLink>
              </li></>
            ) : (
              <>
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
              </>
            )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
