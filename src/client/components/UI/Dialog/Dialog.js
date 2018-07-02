import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const dialog = (props) => {
  const classes = {
    root: {
      color: 'white',
      fontWeight: 500,
    }
  };
  const { primaryDisabled, showButtons, open, title, primaryText, secondaryText, primaryClicked, secondaryClicked, primaryIcon, secondaryIcon, children } = props;
  let buttons = (
    <Button style={{ minWidth: 100, margin: 10 }} variant='raised' onClick={primaryClicked} color="error">
      {primaryIcon}
      {primaryText}
    </Button>
  );
  if (secondaryText) {
    buttons = (
      <React.Fragment>
        <Button style={{ minWidth: 100, margin: 10 }} disabled={primaryDisabled} variant='raised' onClick={primaryClicked} color="primary">
          {primaryIcon}
          {primaryText}
        </Button>
        <Button style={{ minWidth: 100, margin: 10 }} variant='raised' onClick={secondaryClicked} color="secondary">
          {secondaryIcon}
          {secondaryText}
        </Button>
      </React.Fragment>
    );
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle disableTypography style={{ background: '#37474f', marginBottom: 10 }} align='center' id="alert-dialog-slide-title">
          <Typography variant='title' style={classes.root}> {title} </Typography>
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          {showButtons ? buttons : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
dialog.defaultProps = {
  showButtons: true,
}
export default dialog;
