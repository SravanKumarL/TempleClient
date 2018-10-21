import React from 'react';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    color: 'black',
    [theme.breakpoints.up('sm')]: {
      margin: '0 0 0 70px',
    },
    flexGrow: 1,
  }
});

const tabContainer = ({ classes, children }) => {

  return (
    <Typography component="div" className={classes.root}>
      <Fade in={true} timeout={500} mountOnEnter unmountOnExit>
        {children}
      </Fade>
    </Typography >
  );
}

tabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(tabContainer);
