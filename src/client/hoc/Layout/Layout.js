import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import AppBar from '../../components/Navigation/AppBar/AppBar';
import createContainer from '../createContainer/createContainer';
import constants from '../../../store/sagas/constants';

const styles = theme => ({
  appFrame: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    [theme.breakpoints.up('sm')]: {
      position: 'fixed',
    }
  },
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    opacity: 1,
    flexDirection: 'column',
    backgroundColor: blueGrey[800],
    paddingTop: '1rem',
    marginTop: '2.5rem',
    [theme.breakpoints.up('sm')]: {
      marginTop: 44,
    },
  },
});

class Layout extends React.Component {
  handleLogout = () => {
    this.props.history.replace('/');
    this.props.onDatepickerReset([], true);
    this.props.nativeHardResetDatePicker();
    [constants.Poojas, constants.Users, constants.Transactions].forEach(entity => this.props.resetEntity(entity));
    this.props.resetAllUsersCheck();
    this.props.authLogout();
  }
  render() {
    const { classes, role, activeTabChanged, activeTab } = this.props;
    return (
      <div className={classes.appFrame}>
        <AppBar
          activeTab={activeTab}
          logout={this.handleLogout}
          role={role}
          activeTabChanged={activeTabChanged}
        />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    role: state.auth.role,
  }
}

Layout = withStyles(styles)(Layout);

export default withRouter(createContainer(Layout, mapStateToProps)); 