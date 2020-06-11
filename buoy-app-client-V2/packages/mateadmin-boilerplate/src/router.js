import React, { lazy } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';
import AppUser from './containers/AppUser';

const RestrictedRoute = ({
  component: Component,
  userComponent: UserComponent,
  isLoggedIn,
  role,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn && role === 'ROLE_ADMIN' ? (
        <Component {...props} />
      ) : isLoggedIn && role === 'ROLE_USER' ? (
        <UserComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const PublicRoutes = ({ history, isLoggedIn, role }) => (
  <BrowserRouter>
    <>
      <Route
        exact
        path="/"
        component={lazy(() => import('./containers/Page/signin'))}
      />
      <Route
        exact
        path="/signin"
        component={lazy(() => import('./containers/Page/signin'))}
      />
      <RestrictedRoute
        path="/dashboard"
        component={App}
        userComponent={AppUser}
        isLoggedIn={isLoggedIn}
        role={role}
      />
      <Route
        exact
        path="/404"
        component={lazy(() => import('./containers/Page/404'))}
      />
      <Route
        exact
        path="/505"
        component={lazy(() => import('./containers/Page/505'))}
      />
      <Route
        exact
        path="/signup"
        component={lazy(() => import('./containers/Page/signup'))}
      />
      <Route
        exact
        path="/forgot-password"
        component={lazy(() => import('./containers/Page/forgetpassword'))}
      />
      <Route
        exact
        path="/reset-password"
        component={lazy(() => import('./containers/Page/resetpassword'))}
      />
    </>
  </BrowserRouter>
);

function mapStateToProps(state) {
  return {
    isLoggedIn: state.Auth.isLoggedIn !== null,
    role: state.Auth.role,
  };
}
export default connect(mapStateToProps)(PublicRoutes);
