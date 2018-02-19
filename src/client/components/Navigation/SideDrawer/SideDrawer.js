import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Typography from 'material-ui/Typography/Typography';
import UserOptions from './User/User';
import AdminOptions from './Admin/Admin';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  accountInformation: {
    display: 'flex',
    // flexDirection: 'column',
    flexGrow: 1,
  },
  textContainer: {
    display: 'flex',
    width: '150px',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const drawer = (props) => {
  const { classes, theme, role } = props;
  let options = (
    <UserOptions clicked={props.navItemsClicked} />
  );
  if (role === 'admin') {
    options = (
      <AdminOptions clicked={props.navItemsClicked} />
    )
  }
  return (
    <Drawer
      type="permanent"
      classes={{
        paper: classNames(classes.drawerPaper, !props.open && classes.drawerPaperClose),
      }}
      open={props.open}
    >
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <div className={classes.accountInformation}>
            <div style={{ display: 'flex' }}>
              <AccountCircle style={{ marginLeft: '3px' }} />
              <Typography style={{ marginTop: '3px', marginLeft: '3px' }} gutterBottom>
                {props.role === 'user' ? 'User:' : 'Admin:'}
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '5px' }}>
              <Typography gutterBottom style={{ fontWeight: 'bold' }} type='subheading' align='center'>
                {props.user}
              </Typography>
            </div>
          </div>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {options}
      </div>
    </Drawer>
  );
}

drawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(drawer);