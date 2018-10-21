import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Logo from '../../../../assets/logo.svg';
import Receipt from '@material-ui/icons/Receipt';
import Pages from '@material-ui/icons/Pages';
import Event from '@material-ui/icons/Event';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

import { TABS } from '../../../../store/constants/board';
import { ROLE } from '../../../../store/constants/auth';
import { convertToStartCase } from '../../../shared/utility';

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

const { ADMIN } = ROLE;
function SimpleList(props) {
  const { POOJAS, TRANSACTIONS, REPORTS, USERS } = TABS;
  const { classes, role, itemClicked } = props;
  let elements;
  if (role === ADMIN) {
    elements = (
      <React.Fragment>
        <ListItem button onClick={() => itemClicked(POOJAS)}>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText primary={convertToStartCase(POOJAS)} />
        </ListItem>
        <ListItem button onClick={() => itemClicked(USERS)}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={convertToStartCase(USERS)} />
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
        <ListItem button onClick={() => itemClicked(TRANSACTIONS)}>
          <ListItemIcon>
            <Receipt />
          </ListItemIcon>
          <ListItemText primary={convertToStartCase(TRANSACTIONS)} />
        </ListItem>
        <ListItem button onClick={() => itemClicked(REPORTS)}>
          <ListItemIcon>
            <Pages />
          </ListItemIcon>
          <ListItemText primary={convertToStartCase(REPORTS)} />
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