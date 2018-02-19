import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Receipt, Edit, SpeakerNotes, Home } from 'material-ui-icons';

export const transactionItems = (props) => (
  <div>
    <ListItem button tabIndex={0} onClick={props.clicked.bind(this, 'receipt')} >
      <ListItemIcon>
        <Receipt />
      </ListItemIcon>
      <ListItemText primary="Create Transaction" />
    </ListItem>
    <ListItem button tabIndex={0} onClick={props.clicked.bind(this, 'edit')}>
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      <ListItemText primary="Edit Transaction" />
    </ListItem>
  </div>
);

export const reportItems = (props) => (
  <div>
    <ListItem button tabIndex={0} onClick={props.clicked.bind(this, 'reports')}>
      <ListItemIcon>
        <SpeakerNotes />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </div>
);

export const HomeItem = (props) => (
  <div>
    <ListItem button tabIndex={0} onClick={props.clicked.bind(this, 'home')}>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
  </div>
);

