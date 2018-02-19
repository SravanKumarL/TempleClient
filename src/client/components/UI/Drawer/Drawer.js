import React from 'react';
import Drawer from 'material-ui/Drawer/Drawer';

const drawer = (props) => {
  return (
    <Drawer anchor={props.side} open={props.open} onClose={props.closed}>
      {props.children}
    </Drawer>
  )
};

export default drawer;