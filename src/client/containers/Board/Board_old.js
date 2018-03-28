import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import User from './User/User';
import Admin from './Admin/Admin';

const styles = theme => ({
  adminContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  userContainer: {
    display: 'flex',
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class Board extends React.Component {

  render() {
    const { classes } = this.props;
    let options = (
      <div className={classes.userContainer} style={{ flexDirection: 'row' }}>
        <User />
      </div>
    );
    if (this.props.role === 'admin') {
      options = (
        <div className={classes.adminContainer} style={{ flexDirection: 'row' }}>
          <Admin />
          </div>
      );
    }
    return (
      <div className={classes.adminContainer}>
        <div className={classes.titleTextContainer}>
          <Typography variant='headline' gutterBottom align='center'>
            Welcome to the Temple Software
          </Typography>
        </div>
        {options}
      </div>
    );
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    role: state.auth.role,
  }
}
export default withRouter(connect(mapStateToProps)(withStyles(styles)(Board)));
