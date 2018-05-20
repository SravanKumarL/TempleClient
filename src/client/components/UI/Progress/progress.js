import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    top:'50%',
    width:'100%',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    opacity:1.0,
    position:'absolute',
    zIndex:100,
    background:theme.palette.background.paper
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.progress}>
      <CircularProgress size={50} />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);