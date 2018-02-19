import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Receipt, SpeakerNotes, Edit, Home } from 'material-ui-icons';
// import Divider from 'material-ui/Divider';
import List from 'material-ui/List';

import Aux from '../../../../hoc/Wrapper/Wrapper';


const user = (props) => (
  <Aux>
    <List>
      <ListItem button title="Home" tabIndex={0} onClick={() => props.clicked('home')}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      {/* </List> */}
      {/* <Divider /> */}
      {/* <List> */}
      <ListItem button title='Create Transaction' tabIndex={0} onClick={() => props.clicked('receipt')} >
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary="Create Transaction" />
      </ListItem>
      <ListItem button title='Edit Transaction' tabIndex={0} onClick={() => props.clicked('edit')}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText primary="Edit Transaction" />
      </ListItem>
      {/* </List> */}
      {/* <Divider /> */}
      {/* <List> */}
      <ListItem title='Reports' button tabIndex={0} onClick={() => props.clicked('reports')}>
        <ListItemIcon>
          <SpeakerNotes />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </List>
    {/* <Divider /> */}
  </Aux>
);

export default user;