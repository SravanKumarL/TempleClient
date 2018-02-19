import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography/Typography';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '52%',
    transform: `translate(-${50}%, -${50}%)`,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  }
});

const modal = (props) => {
  const { classes } = props;
  return (
    <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.open}
          onClose={props.closed}
        >
          <div className={classes.paper}>
            <Typography type='title' align='center'>
              {props.title}
            </Typography>
            <div className={classes.content}>
              {props.children}
            </div>
          </div>
        </Modal>
    </div>
  );
}

modal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default withStyles(styles)(modal);