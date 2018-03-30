import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const dialog = (props) => {
  const { handleClose, open, title, primaryText, secondaryText, primaryClicked, secondaryClicked, children } = props;
  let buttons = (
    <Button style={{ minWidth: 100 }} variant='raised' onClick={primaryClicked} color="primary">
      {primaryText}
    </Button>
  );
  if (secondaryText) {
    buttons = (
      <React.Fragment>
        <Button style={{ minWidth: 100 }} variant='raised' onClick={primaryClicked} color="primary">
          {primaryText}
        </Button>
        <Button style={{ minWidth: 100 }} variant='raised' onClick={secondaryClicked} color="secondary">
          {secondaryText}
        </Button>
      </React.Fragment>
    );
  }
  return (
    <div>
      <Dialog
        open={open}
        transition={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align='center' id="alert-dialog-slide-title">
          {title}
        </DialogTitle>
        <DialogContent >
          {children}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          {buttons}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default dialog;
