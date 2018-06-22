import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Login from './Login/Login';
import Snackbar from '../../components/UI/Snackbar/Snackbar';
import createContainer from '../../hoc/createContainer/createContainer';
import withStyles from '@material-ui/core/styles/withStyles';
import MainPage_M from '../../../assets/MainPage_M.jpg';

const styles = theme => ({
  Authentication: {
    display: 'flex',
    height: '100vh',
    flexGrow: 1,
  },
  LeftPane: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexGrow: 3,
    }
  },
  RightPane: {
    display: 'flex',
    // flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 'auto',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30%',
    }
  },
  background: {
    height: '100vh',
    width: '100%',
    display: 'none',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }
  }
});

const initialState = { open: false };
export class Authentication extends Component {
  state = { ...initialState };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.error) {
      return { open: true, };
    }
    return null;
  }

  submitFormHandler = (username, password, role) => { this.props.authUser(username, password, role); }

  closeHandler = () => {
    this.setState({ open: false });
    this.props.authFail(null);
  }

  render() {
    const { classes } = this.props;
    let loading = null;
    if (this.props.loading) {
      loading = (
        <Fragment>
          <Typography variant='caption'> Signing in...</Typography>
          <CircularProgress />
        </Fragment>
      )
    }

    let errorMessage = null;
    if (this.state.open) {
      errorMessage = (
        <Snackbar
          open={this.state.open}
          close={this.closeHandler}
          message='Login failed! Please enter a valid username and password.'
        />
      );
    }

    return (
      <div className={classes.Authentication}>
        <img src={MainPage_M} alt='Sringeri' className={classes.background} />
        <div className={classes.RightPane}>
          <Login onSubmit={this.submitFormHandler} />
          {loading}
        </div>
        {errorMessage}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    loading: state.auth.loading,
  }
}

export default withStyles(styles)(createContainer(Authentication, mapStateToProps));