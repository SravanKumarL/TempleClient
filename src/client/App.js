import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import './App.css';
import Authentication from './containers/Authentication/Authentication';
import Layout from './hoc/Layout/Layout';
import Board from './containers/Board/Board';
import createContainer from './hoc/createContainer/createContainer';

import classes from './App.css';
import PrivateRoute from './hoc/Router/PropsRoute';

class App extends Component {
  componentDidMount() {
    this.props.autoSignIn();
  }
  handleLogin = () => this.props.history.push('/');
  render() {
    const layout = () => (
      <Layout>
        <Board role={this.props.role} />
      </Layout>
    );
    let routes = (
      <Switch>
        <PrivateRoute path='/' redirectComponent={Authentication} component={layout} isLoggedIn={this.props.isAuthenticated} />
      </Switch>
    );
    return (
      <div className={classes.App}>
        {routes}
      </div>
    );
  }
} 
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.auth.role
  }
}

export default withRouter(createContainer(App, mapStateToProps));
