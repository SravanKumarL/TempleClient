import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

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
    background:'white'
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div style={classes.progress}>
      <CircularProgress size={50} />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);