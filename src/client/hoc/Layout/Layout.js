import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import AppBar from '../../components/Navigation/AppBar/AppBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import * as actions from '../../../store/actions';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
    button: {
      position: 'absolute',
    }
  },
});

class Layout extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLogout = () => {
    this.props.history.replace('/');
    this.props.onLogout();
  }
  handleNavItemsClick = (itemClicked) => {
    let url;
    switch (itemClicked) {
      case 'home':
        url = '/';
        break;
      case 'receipt':
        url = '/transactions/create';
        break;
      case 'edit':
        url = '/transactions/edit';
        break;
      case 'reports':
        url = '/reports';
        break;
      default:
        break;
    }
    if (this.props.location.pathname !== url) {
      this.props.history.push(url);
    }
  }
  render() {
    const { classes, user, role } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            open={this.state.open}
            close={this.handleClose}
            logout={this.handleLogout}
            drawerOpen={this.handleDrawerOpen}
            role={role}
          />
          <SideDrawer
            open={this.state.open}
            handleDrawerClose={this.handleDrawerClose}
            navItemsClicked={this.handleNavItemsClick.bind(this)}
            user={user}
            role={role}
          />

          <main className={classes.content}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    role: state.auth.role,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogout: () => {
      dispatch(actions.authLogout());
    }
  }
}
Layout = withStyles(styles)(Layout);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));