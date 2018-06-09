import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';

import Receipt from '@material-ui/icons/Receipt';
import Pages from '@material-ui/icons/Pages';
import Event from '@material-ui/icons/Event';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: '40%',
  },
});

function SimpleList(props) {
  const { classes, role, itemClicked } = props;
  let elements;
  if (role === 'admin') {
    elements = (
      <React.Fragment>
        <ListItem button onClick={() => itemClicked('poojas')}>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText primary="Poojas" />
        </ListItem>
        <ListItem button onClick={() => itemClicked('users')}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </React.Fragment>
    );
  }
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button onClick={() => itemClicked('transactions')}>
          <ListItemIcon>
            <Receipt />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
        <ListItem button onClick={() => itemClicked('reports')}>
          <ListItemIcon>
            <Pages />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        {elements}
      </List>
      <Divider />
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);