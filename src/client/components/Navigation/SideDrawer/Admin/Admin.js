import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Home, SpeakerNotes, Edit, Delete, PersonAdd, Assignment, RemoveCircle, Update } from 'material-ui-icons';
import Divider from 'material-ui/Divider';
import Tooltip from 'material-ui/Tooltip/Tooltip';

import Aux from '../../../../hoc/Wrapper/Wrapper';


const admin = (props) => (
  <Aux>
    <List>
      <Tooltip id="home-icon" title="Home">
      <ListItem button tabIndex={0} onClick={() => props.clicked('home')}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      </Tooltip>
    </List>
    <Divider />
    <List>
      <ListItem button tabIndex={0} onClick={() => props.clicked('edit')} >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText primary="Edit Transaction" />
      </ListItem>
      <ListItem button tabIndex={0} onClick={() => props.clicked('delete')}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText primary="Delete Transactions" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button tabIndex={0} onClick={() => props.clicked('adduser')} >
        <ListItemIcon>
          <PersonAdd />
        </ListItemIcon>
        <ListItemText primary="Add User" />
      </ListItem>
      <ListItem button tabIndex={0} onClick={() => props.clicked('deleteuser')}>
        <ListItemIcon>
          <RemoveCircle />
        </ListItemIcon>
        <ListItemText primary="Delete User" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button tabIndex={0} onClick={() => props.clicked('addPooja')} >
        <ListItemIcon>
          <Assignment />
        </ListItemIcon>
        <ListItemText primary="Add Pooja" />
      </ListItem>
      <ListItem button tabIndex={0} onClick={() => props.clicked('updatePooja')}>
        <ListItemIcon>
          <Update />
        </ListItemIcon>
        <ListItemText primary="Update Pooja" />
      </ListItem>
      <ListItem button tabIndex={0} onClick={() => props.clicked('deletePooja')}>
        <ListItemIcon>
          <RemoveCircle />
        </ListItemIcon>
        <ListItemText primary="Delete Pooja" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button tabIndex={0} onClick={() => props.clicked('reports')}>
        <ListItemIcon>
          <SpeakerNotes />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </List>
  </Aux>
);

export default admin;