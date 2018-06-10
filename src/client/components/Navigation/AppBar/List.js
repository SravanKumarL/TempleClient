import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Logo from '../../../../assets/logo.svg';

// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';

import Receipt from '@material-ui/icons/Receipt';
import Pages from '@material-ui/icons/Pages';
import Event from '@material-ui/icons/Event';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    display: 'flex',
  }
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
      <div className={classes.logo}>
        <img src={Logo} style={{ height: 90, width: 70 }} alt='Logo' />
        <Typography style={{ display: 'flex', alignItems: 'center' }} variant='title' align='center'>BookMySeva 1.0</Typography>
      </div>
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
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);