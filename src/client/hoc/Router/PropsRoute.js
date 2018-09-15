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
class PrivateRoute extends React.PureComponent {
  render() {
    const { component, redirectComponent, isLoggedIn, ...rest } = this.props;
    return (
      <Route {...rest} render={routeProps => {
        return isLoggedIn ? (renderMergedProps(component, routeProps, rest)) : renderMergedProps(redirectComponent, routeProps, rest);
      }} />);
  }
}

export default PrivateRoute;