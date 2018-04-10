import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Authentication from './containers/Authentication/Authentication';
import Layout from './hoc/Layout/Layout';
import Board from './containers/Board/Board';
import Pooja from './containers/Poojas/Poojas';

import * as actions from '../store/actions/index';

import classes from './App.css';
import { PrivateRoute } from './hoc/Router/PropsRoute';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }
  handleLogin=()=>this.props.history.push('/');
  render() {
    const layout=()=>(
      <Layout>
        <Board role={this.props.role}/>
      </Layout>
    );
    let routes = (
      <Switch>
        <PrivateRoute path='/' redirectComponent={Authentication} component={layout} isLoggedIn={this.props.isAuthenticated}/>
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
    role:state.auth.role
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => {
      dispatch(actions.autoSignIn())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
