import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (

      <a
        href=""
        onClick={this.onLogoutClick.bind(this)}
        className="nav-link"
      >
        <p>Logout</p>
      </a>

    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"></li>
        <Link className="nav-link" to="/register">
          Sign Up
          </Link>

        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">

        <Link className="navbar-brand" to="/">
          Connect
          </Link>

        {isAuthenticated ? authLinks : guestLinks}

      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  Navbar
);