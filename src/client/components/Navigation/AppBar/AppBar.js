import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Search from '@material-ui/icons/Search';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from './List';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'fixed',
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

  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
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
  },
  root: {
    flexGrow: 1,
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 48,
    },
    minHeight: 'initial',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});
class MyAppBar extends React.Component {
  state = { anchorEl: null, drawerOpen: false, searchPanelOpen: false };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDrawerToggle = () => {
    this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
  };
  handleSearchPanelToggle = () => {
    this.setState(prevState => {
      return { ...prevState, searchPanelOpen: !prevState.searchPanelOpen }
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes, theme, logout, role, activeTabChanged, activeTab } = this.props;
    const { anchorEl, drawerOpen } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <AppBar className={classNames(classes.root)}>
          <Toolbar classes={{ root: classes.root }}>
            <Hidden smUp>
              <IconButton onClick={this.handleDrawerToggle} className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown>
              <Typography variant="title" color="inherit" className={classes.flex}>
                BookMySeva 1.0
            </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant="title" style={{ textTransform: 'capitalize' }} color="inherit" className={classes.flex}>
                {activeTab} 
              </Typography>
            </Hidden>
            <Hidden lgUp>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleSearchPanelToggle}
                color="inherit">
                <Search />
              </IconButton>
            </Hidden>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={logout}> Logout </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        {/* <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'left' : 'right'}
          open={searchPanelOpen}
          onClose={this.handleSearchPanelToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SearchTransaction searchPanelOpen={searchPanelOpen} itemSelected={this.itemSelectionChangedHandler} />
        </Drawer> */}
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={drawerOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <List itemClicked={activeTabChanged} role={role} />
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyAppBar);

