
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

  const isActive = (match, location) => {
    if (match) {
      return true;
    }
    return false;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary p-1">
      <div className="container-fluid d-flex justify-content-between">
        <a className="navbar-brand pl-4" href="/">
          <img src={process.env.PUBLIC_URL + '/PodClipBot.com2.png'} alt="logo" className="logo w-44" />
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="font-weight-bold"
              isActive={isActive}
              exact
              to="/"
              style={({ isActive }) => ({
                color: isActive ? '#b7b7b7' : 'white',
              })}
            >
              Tool
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="font-weight-bold"
              isActive={isActive}
              to="/subscriptions"
              style={({ isActive }) => ({
                color: isActive ? '#b7b7b7' : 'white',
              })}
            >
              Subscription
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="font-weight-bold"
              isActive={isActive}
              exact
              to="/login"
              style={({ isActive }) => ({
                color: isActive ? '#b7b7b7' : 'white',
              })}
            >
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </li>
            {user ? (
              // <div>
              //   <span>Welcome, {user.username}!</span>
              //   <button onClick={handleLogout}>Logout</button>
              // </div>
              <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="font-weight-bold"
                isActive={isActive}
                exact
                to="/login"
                style={({ isActive }) => ({
                  color: isActive ? '#b7b7b7' : 'white',
                })}
                onClick={handleLogout}
              >
              <FontAwesomeIcon icon={faSignOut} />
            </NavLink>
            </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="font-weight-bold"
                  isActive={isActive}
                  to="/login"
                  style={({ isActive }) => ({
                    color: isActive ? '#b7b7b7' : 'white',
                  })}
                >
                  Login
                </NavLink>
              </li>
            )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
