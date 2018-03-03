import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import CSSTransition from 'react-transition-group/CSSTransition';
// import Slide from 'material-ui/transitions/Slide';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography/Typography';
import Grow from 'material-ui/transitions/Grow';

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
    transition: 'all 0.5s ease',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  showModal: {
    transform: 'translateY(0)',
  },
  hideModal: {
    transform: 'translateY(100%)',
  },
});

const modal = (props) => {
  const { classes } = props;
  return (
    // <Slide
    //   mountOnEnter
    //   unmountOnExit
    //   direction='down'
    //   // classNames={
    //   //   {
    //   //     enterActive: classes.showModal,
    //   //     exitActive: classes.hideModal,
    //   //   }
    //   // }
    //   // timeout={500}
    //   in={props.open}
    // >
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
  );
}

modal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default withStyles(styles)(modal);