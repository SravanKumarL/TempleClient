import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import AppBar from '../../components/Navigation/AppBar/AppBar';

const styles = theme => ({
  appFrame: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    [theme.breakpoints.up('sm')]: {
      position: 'fixed',
    }
  },
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    opacity: 1,
    flexDirection: 'column',
    backgroundColor: blueGrey[800],
    paddingTop: '1rem',
    marginTop: '2.5rem',
    [theme.breakpoints.up('sm')]: {
      marginTop: 44,
    },
  },
});

const layout = ({ classes, children }) => {
  return (
    <div className={classes.appFrame}>
      <AppBar />
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}

export default withStyles(styles)(layout);