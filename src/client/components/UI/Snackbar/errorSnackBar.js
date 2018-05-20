import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  snackBar:{
    background:theme.palette.primary.dark
  }
});

class ErrorSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.getDefaultState = () => {
      return {
        actions: [
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={this.props.classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon/>
          </IconButton>,
        ]
      };
    }
    this.state = this.getDefaultState();
    this.state.actions=this.getActions();
  }
  redoTransaction=()=>{
    this.props.redoTransaction();
    this.props.onSnackBarClose();
  }
  getActions=(redoTransaction)=>{
    let actions=this.getDefaultState().actions;
    if (redoTransaction !== null) {
      let tryAgain = <Button key="tryagain" color="secondary" size="small" onClick={this.redoTransaction}>
        Try Again
        </Button>;
      actions.unshift(tryAgain);
    }
    return actions;
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.onSnackBarClose();
  };
  componentWillReceiveProps(nextProps){
    let actions=this.getActions(nextProps.redoTransaction);
    this.setState({actions})
  }
  render() {
    const { message,open,classes } = this.props;
    return (
      <div>
        <Snackbar
          className={classes.snackBar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={this.state.actions}
        />
      </div>
    );
  }
}
ErrorSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message:PropTypes.string.isRequired,
  open:PropTypes.bool.isRequired,
  onSnackBarClose:PropTypes.func.isRequired
};

export default withStyles(styles)(ErrorSnackbar);
