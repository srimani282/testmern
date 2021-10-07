import React, { Component } from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './navElements';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';


class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <>

                <NavLink to='/landing' activeStyle>
                    Home
</NavLink>

                <a
                    href=""
                    onClick={this.onLogoutClick.bind(this)}
                    className="nav-link"
                >
                    <p>Logout</p>
                </a>
            </>
        );
        const guestLinks = (
            <ul >

                <NavLink to='/register' activeStyle>
                    Sign Up
          </NavLink>

                <NavBtn>
                    <NavLink to='/login'>Sign In</NavLink>
                </NavBtn>
            </ul>
        );
        return (
            <>
                <Nav>
                    <NavLink to='/'>
                        {/* <img src={require('../../images/logo.svg')} alt='logo' /> */}
                    </NavLink>
                    <Bars />
                    <NavMenu>


                        {isAuthenticated ? authLinks : guestLinks}
                    </NavMenu>


                </Nav>
            </>
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
