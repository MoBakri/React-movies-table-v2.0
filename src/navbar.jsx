import React from "react";
import { Link } from "react-router-dom";
const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/*eslint-disable*/}
      <a className="navbar-brand">IMDB</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/movies" className="nav-item nav-link">
            Movies
          </Link>
          {!user && (
            <React.Fragment>
              <Link to="/register" className="nav-item nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-item nav-link">
                Login
              </Link>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <Link to="/" className="nav-item nav-link">
                {`@${user.name}`}
              </Link>
              <Link to="/logout" className="nav-item nav-link">
                logout
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
