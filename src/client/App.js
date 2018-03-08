import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Authentication from './containers/Authentication/Authentication';
import Layout from './hoc/Layout/Layout';
import Board from './containers/Board/Board';
import Transactions from './containers/Transactions/Transactions';
import EditTransaction from './containers/Transactions/EditTransaction';
import Poojas from './containers/Poojas/Poojas';
import Reports from './containers/Reports/Reports';
import ManagementReport from './containers/Reports/ManagementReport';
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
              <Route path='/poojas' exact component={Poojas} />
              <Route path='/reports/managementReport' exact component={ManagementReport} />
              <Route path='/reports' component={Reports} />
              <Route path='/transactions/edit' component={EditTransaction} />
              <Route path='/transactions/create' component={Transactions} />
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
