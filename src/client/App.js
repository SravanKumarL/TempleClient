import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import './App.css';
import Authentication from './containers/Authentication/Authentication';
import Layout from './hoc/Layout/Layout';
import Board from './containers/Board/Board';
import createContainer from './hoc/createContainer/createContainer';

import classes from './App.css';
import PrivateRoute from './hoc/Router/PropsRoute';

class AppLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Board />
      </Layout>
    );
  }
}

class App extends Component {
  componentDidMount() {
    this.props.autoSignIn();
  }
  handleLogin = () => this.props.history.push('/');
  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <PrivateRoute path='/' redirectComponent={Authentication} component={AppLayout} isLoggedIn={this.props.isAuthenticated} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.auth.role
  }
}

export default withRouter(createContainer(App, mapStateToProps));
