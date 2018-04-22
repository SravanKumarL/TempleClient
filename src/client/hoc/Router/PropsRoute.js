import React from 'react';
import { Route } from 'react-router-dom';
const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
      React.createElement(component, finalProps)
    );
  }
  
 export const PropsRoute = ({ component, ...rest }) => {
    return (
      <Route {...rest} render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}/>
    );
  }
export const PrivateRoute = ({ component, redirectComponent, isLoggedIn, ...rest }) => {
    return (
      <Route {...rest} render={routeProps => {
        return isLoggedIn ? (renderMergedProps(component, routeProps, rest)):renderMergedProps(redirectComponent,routeProps,rest);}}/>);
    //     ) : (
    //       <Redirect to={{
    //         pathname: redirectTo,
    //         state: { from: routeProps.location }
    //       }}/>
    //     );
    //   }}/>
    // );
  };