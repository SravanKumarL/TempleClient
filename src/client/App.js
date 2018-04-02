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

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/' component={Authentication} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Layout>
          <Switch>
            <Route path='/poojas' exact component={Pooja} />
            <Route path='/' exact component={Board} />
            <Redirect to='/' />
          </Switch>
        </Layout>
      );
    }
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
