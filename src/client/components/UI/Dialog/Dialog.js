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
  
  const { handleClose, showButtons, open, title, primaryText, secondaryText, primaryClicked, secondaryClicked, primaryIcon, secondaryIcon, children } = props;
  let buttons = (
    <Button style={{ minWidth: 100, margin: 10 }} variant='raised' onClick={primaryClicked} color="error">
      {primaryIcon}
      {primaryText}
    </Button>
  );
  if (secondaryText) {
    buttons = (
      <React.Fragment>
        <Button style={{ minWidth: 100, margin: 10 }} variant='raised' onClick={primaryClicked} color="primary">
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
        transition={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align='center' id="alert-dialog-slide-title">
          {title}
        </DialogTitle>
        <DialogContent style={{ padding: '24px 24px 24px' }} >
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
