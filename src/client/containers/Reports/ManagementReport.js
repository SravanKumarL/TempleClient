import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography/Typography';

import Paper from '../../components/UI/Paper/Paper';
import * as actions from '../../../store/actions';
import constants from '../../../store/sagas/constants';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'auto',
  },
  button: {
    width: '200px',
  }
});
class Search extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }
  render() {
    const fields = [
      { name: 'Phone Number', id: 'phoneNumber' },
      { name: 'Names', id: 'names' },
      { name: 'Gothram', id: 'gothram' },
      { name: 'Nakshatram', id: 'nakshatram' },
      { name: 'Pooja', id: 'pooja' },
      { name: 'From Date', id: 'from' },
      { name: 'To Date', id: 'to' },
      { name: 'Number of Days', id: 'numberOfDays' },
      { name: 'Amount', id: 'amount' },
      { name: 'Created By', id: 'createdBy' },
    ]
    const { classes } = this.props;
    let transactions = null;
    if (this.props.transactions) {
      transactions = (
        this.props.transactions.map(transaction => {
          return (
            <Paper key={transaction._id} className={classes.container}>
              <Typography type="headline" align='center'>
                Details:
            </Typography>
              {fields.map(field => (
                <Typography variant='body1'>
                  {field.name}: {transaction[`${field.id}`]}
                </Typography>
              ), transaction)}
            </Paper>
          );
        }
        ));
    }
    return (
      <div className={classes.content}>
        {transactions}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: () => {
      dispatch(actions.fetchData(constants.Transactions));
    }
  }
}
const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.transactions
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search)));