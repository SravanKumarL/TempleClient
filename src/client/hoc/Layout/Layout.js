import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import AppBar from '../../components/Navigation/AppBar/AppBar';
import createContainer from '../createContainer/createContainer';

const styles = theme => ({
  appFrame: {
    position: 'fixed',
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: blueGrey[800],
    paddingTop: '1rem',
    marginTop: '2.5rem',
    [theme.breakpoints.up('sm')]: {
      marginTop: 44,
    },
  },
});

class Layout extends React.Component {
  handleLogout = () => {
    this.props.history.replace('/');
    this.props.authLogout();
  }
  render() {
    const { classes, role, activeTabChanged } = this.props;
    return (
      <div className={classes.appFrame}>
        <AppBar
          logout={this.handleLogout}
          role={role}
          activeTabChanged={activeTabChanged}
        />
        <main className={classes.content}>
          {this.props.children}
        </main>
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

Layout = withStyles(styles)(Layout);

export default withRouter(createContainer(Layout, mapStateToProps)); 