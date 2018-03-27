import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import Snackbar from '../../components/UI/Snackbar/Snackbar';
import TransactionSummary from '../../components/TransactionSummary/TransacationSummary';
import * as actions from '../../../store/actions';
import CreateTransaction from './Containers/CreateTransaction';
import SearchTransaction from './Containers/SearchTransaction';
import constants from '../../../store/sagas/constants';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1
  },
  panes: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
  leftPane: {
    display: 'flex',
    width: '300px'
  },
  rightPane: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '300px'
  },
  tabRoot: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '500px',
    alignItems: 'center',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 1px 1px #D3D3D3',
    height: '90%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Transactions extends React.Component {
  state = {
    modalOpen: false,
    snackOpen: false,
    activeTab: 'pooja',
    transactionInformation: [],
    selectedTransaction: {},
  };

  closeSnackHandler = () => this.setState({ snackOpen: false });

  modalOpenHandler = () => this.setState({ modalOpen: true });

  modalCloseHandler = () => this.setState({ modalOpen: false });

  printHandler = () => {
    const createdBy = this.props.user;
    const { transactionInformation } = this.state;
    let transaction = Object.keys(this.state.transactionInformation)
      .reduce((acc, item) => {
        return Object.assign(acc, { [`${item}`]: transactionInformation[`${item}`]['value'] });
      }, {});
    transaction = { ...transaction, createdBy };
    this.props.addTransaction(transaction);
    this.modalCloseHandler();
    // window.print();
    // this.setState({ open: true });
  }

  tabChangeHandler = (event, value) => {
    this.setState({
      activeTab: value,
    });
  }
  itemSelectionChangedHandler = (selectedTransaction) => {
    this.setState({ selectedTransaction });
  }
  formSubmitHandler = (transactionInformation) => {
    this.setState({ modalOpen: true, transactionInformation });
  }
  render() {
    const { classes } = this.props;
    const { activeTab, transactionInformation, modalOpen, selectedTransaction } = this.state;
    let message = null;
    if (this.props.message) {
      message = (
        <Snackbar open={this.state.snackOpen} close={this.closeSnackHandler} message={this.props.message} />
      );
    }
    return (
      <div className={classes.panes} >
        <div className={classes.leftPane}></div>
        <div className={classes.root}>
          <Paper className={classes.tabRoot}>
            <Tabs value={activeTab} onChange={this.tabChangeHandler} fullWidth>
              <Tab value='pooja' label='Pooja' />
              <Tab value='special pooja' label='Special Pooja' />
              <Tab value='other' label='Other' />
            </Tabs>
          </Paper>
          <CreateTransaction
            submit={this.formSubmitHandler}
            activeTab={activeTab}
            selectedTransaction={selectedTransaction}
          />
          <TransactionSummary
            open={modalOpen}
            transactionFields={transactionInformation}
            createdBy={this.props.user}
            print={this.printHandler}
            summaryClosed={this.modalCloseHandler} />
          {message}
        </div>
        <div className={classes.rightPane}>
          <SearchTransaction itemSelected={this.itemSelectionChangedHandler} />
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.transactions.message,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTransaction: (transaction) => {
      dispatch(actions.commitTransaction(constants.add,constants.Transactions,transaction));
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Transactions)));
