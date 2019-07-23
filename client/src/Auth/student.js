import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn, checkRole } from '../Auth';

const Student = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return loggedIn() && checkRole() === 'STUDENT' ? (
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

export default Student;
