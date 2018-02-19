import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import Login from './Login/Login';
import classes from './Authentication.css';
import { connect } from 'react-redux';
import Aux from '../../hoc/Wrapper/Wrapper';
import * as actions from '../../../store/actions';

class Authentication extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        open: true,
      });
    }
  }
  state = {
    open: false,
  }
  transitionUp = (props) => {
    return <Slide direction="up" {...props} />;
  }
  submitFormHandler = (username, password, role) => {
    this.props.onAuthSubmit(username, password, role)
  }
  handleClose = () => {
    this.setState({
      open: false,
    });
  }
  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.open}
          onClose={this.handleClose}
          transition={this.transitionUp}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">'Login failed! Please enter a valid username and password.'</span>}
        />
      )
    }
    return (
      <Aux>
        <div className={classes.Authentication}>
          <div className={classes.LeftPane} />
          <div className={classes.RightPane}>
            <Login onSubmit={this.submitFormHandler} />
          </div>
          {errorMessage}
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSubmit: (username, password, role) => {
      dispatch(actions.authUser(username, password, role));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);