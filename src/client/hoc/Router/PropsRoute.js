import React from 'react';
import { Route } from 'react-router-dom';

const renderMergedProps = (Component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (<Component {...finalProps} />);
}

export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }} />
  );
}
const PrivateRoute = ({ component, redirectComponent, isLoggedIn, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return isLoggedIn ? (renderMergedProps(component, routeProps, rest)) : renderMergedProps(redirectComponent, routeProps, rest);
    }} />);
};

export default PrivateRoute;