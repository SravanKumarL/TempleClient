import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Typography from 'material-ui/Typography';
import Carousel from 're-carousel';

import Login from './Login/Login';
import Aux from '../../hoc/Wrapper/Wrapper';
import Snackbar from '../../components/UI/Snackbar/Snackbar';
import IndicatorDots from '../../components/UI/IndicatorDots/IndicatorDots';
import Buttons from '../../components/UI/CarouselButtons/CarouselButtons';
import * as actions from '../../../store/actions';
import Saraswati from '../../../assets/Saraswathi.jpg';
import Durga from '../../../assets/Durga.jpg';
import classes from './Authentication.css';

class Authentication extends Component {
  state = {
    open: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        open: true,
      });
    }
  }

  submitFormHandler = (username, password, role) => {
    this.props.onAuthSubmit(username, password, role)
  }

  closeHandler = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    let loading = null;
    if (this.props.loading) {
      loading = (
        <Fragment>
          <Typography type='caption'> Signing in...</Typography>
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
      <Aux>
        <div className={classes.Authentication}>
          <div className={classes.LeftPane}>
            <Carousel loop auto widgets={[IndicatorDots, Buttons]}>
              <div style={{ height: '100%' }}>
                <img src={Saraswati} alt='Saraswati Alankaram' />
              </div>
              <div style={{ height: '100%' }}>
                <img src={Durga} alt='Durga' />
              </div>
              <div style={{ backgroundColor: 'orchid', height: '100%' }}>Frame 3</div>
            </Carousel>
          </div>
          <div className={classes.RightPane}>
            <Login onSubmit={this.submitFormHandler} />
            {loading}
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
    loading: state.auth.loading,
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