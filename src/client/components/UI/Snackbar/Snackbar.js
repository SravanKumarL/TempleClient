import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const snackbar = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={props.open}
      autoHideDuration={1000}
      color={props.color}
      onClose={props.close}
      message={<span id="message-id">{props.message}</span>}
    />
  );
}

export default snackbar;