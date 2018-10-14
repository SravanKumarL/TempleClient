import React from 'react';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import RecentTransactionList from './components/RecentTransactionList';
import { Paper } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2vh 0px 0px 3vh',
    marginRight: '15%',
    height: '83vh'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  list: {
    display: 'flex',
    height: 'auto',
    width: '100%',
  }
}
class RecentTransaction extends React.Component {
  render() {
    const { classes } = this.props;
    return <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant='title' align='center'>Recent Transactions </Typography>
        <Typography variant='caption'>Last 14 transactions are displayed. Please click to use it</Typography>
      </div>
      <div className={classes.list}>
        <RecentTransactionList />
      </div>
      {/* <TransactionList /> */}
    </Paper>
  }
}

export default withStyles(styles)(RecentTransaction);