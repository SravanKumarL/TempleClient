import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

const transitionUp = (props) => { return (<Slide direction="up" {...props} />) };

const snackbar = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={props.open}
      autoHideDuration={2000}
      onClose={props.close}
      transition={(props) => transitionUp(props)}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{props.message}</span>}
    />
  );
}

export default snackbar;