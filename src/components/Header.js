
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const isActive = (match, location) => {
    if (match) {
      return true;
    }
    return false;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid d-flex justify-content-between">
        <a className="navbar-brand pl-4" href="/">
          <img src={process.env.PUBLIC_URL + '/PodClipBot.com.png'} alt="logo" className="logo w-64" />
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="font-weight-bold"
              isActive={isActive}
              exact
              to="/"
              style={({ isActive }) => ({
                color: isActive ? 'orange' : 'white',
              })}
            >
              Tool
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="font-weight-bold"
              isActive={isActive}
              to="/subscriptions"
              style={({ isActive }) => ({
                color: isActive ? 'orange' : 'white',
              })}
            >
              Subscription
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="font-weight-bold"
              isActive={isActive}
              to="/login"
              style={({ isActive }) => ({
                color: isActive ? 'orange' : 'white',
              })}
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="font-weight-bold"
              isActive={isActive}
              exact
              to="/"
              style={({ isActive }) => ({
                color: isActive ? 'orange' : 'white',
              })}
            >
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
