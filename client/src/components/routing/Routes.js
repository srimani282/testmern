import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Landing from '../UserNetwork/Landing'
import PrivateRoute from './PrivateRoute';
import ManagerRoute from './ManagerRoute';

const Routes = props => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/landing" component={Landing} />
      </Switch>
    </section>
  );
};

export default Routes;
