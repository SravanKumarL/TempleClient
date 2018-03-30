import React from 'react';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Dashboard from 'material-ui-icons/Dashboard';
import Tooltip from 'material-ui/Tooltip';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 24,
  },
  hide: {
    display: 'none',
  },
  profileButton: {
    marginLeft: 'auto',
    marginRight: 36,
    height: 32,
  },
  logout: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginBottom: 3
  },
  logoutText: {
    color: 'white',
    marginLeft: '12px',
    fontSize: '1rem'
  },
  accountCircle: {
    marginBottom: '5px',
  },
  toolbar: {
    marginLeft: 50,
    marginTop: 5
  }
});

const appBar = (props) => {
  const { classes } = props;
  return (
    <AppBar className={classNames(classes.appBar, props.open && classes.appBarShift)}>
      {/* <Toolbar disableGutters classes={classes.toolbar} className={props.open ? classes.toolbar : ''}> */}
      {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.drawerOpen}
          className={classNames(classes.menuButton, props.open && classes.hide)}
        >
          <MenuIcon />
        </IconButton> */}
      <div style={{ display: 'flex',marginLeft: '3vw', marginTop: 6}}>
        <Dashboard style={{ marginLeft: 'auto', marginRight: 5 }} />
        <Typography  variant="title" color="inherit" noWrap gutterBottom>
          {props.role === 'user' ? 'User Board' : 'Admin Board'}
        </Typography>
      </div>
      <div className={classes.logout}>
        <Tooltip id="tooltip-bottom" title="Logout" placement="bottom">
          <IconButton
            className={classes.profileButton}
            aria-owns={'menu-appbar'}
            aria-haspopup="true"
            onClick={props.logout}
            color="inherit"
          >
            <AccountCircle className={classes.accountCircle} />
            <Typography className={classes.logoutText} variant='subheading' gutterBottom>
              Logout
          </Typography>
          </IconButton>
        </Tooltip>

      </div>
      {/* </Toolbar> */}
    </AppBar >
  );
}

export default withStyles(styles)(appBar);

