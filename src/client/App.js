import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import './App.css';
import Authentication from './containers/Authentication/Authentication';
import Layout from './hoc/Layout/Layout';
import Board from './containers/Board/Board';
import createContainer from './hoc/createContainer/createContainer';

import classes from './App.css';
import PrivateRoute from './hoc/Router/PropsRoute';
import { TABS } from '../store/constants/board';

const { TRANSACTIONS } = TABS;
class App extends Component {
  state = {
    activeTab: TRANSACTIONS,
  }
  componentDidMount() {
    this.props.autoSignIn();
  }
  activeTabChangedHandler = (activeTab) => { this.setState({ activeTab }); }
  handleLogin = () => this.props.history.push('/');
  render() {
    const layout = () => (
      <Layout activeTab={this.state.activeTab} activeTabChanged={this.activeTabChangedHandler}>
        <Board activeTab={this.state.activeTab} role={this.props.role} resetEntity={this.props.resetEntity} />
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
    isAuthenticated: /* state.auth.token !== null */true,
    role: /* state.auth.role */'admin'
  }
}

export default withRouter(createContainer(App, mapStateToProps));
