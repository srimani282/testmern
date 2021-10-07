import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const ManagerRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, userType },
  ...rest
}) => (
    <Route
      {...rest}
      render={props =>
        loading ? (
          <Spinner />
        ) : userType === "admin" ? (
          <Component {...props} />
        ) : (         
              <Redirect to="/login" />
            )
      }
    />
  );

ManagerRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ManagerRoute);