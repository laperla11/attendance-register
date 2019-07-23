import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn, checkRole } from '../Auth';

const Admin = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return loggedIn() && checkRole() === 'ADMIN' ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );
      }}
    />
  );
};

export default Admin;
