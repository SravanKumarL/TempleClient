import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import blueGrey from 'material-ui/colors/blueGrey';
import Fade from 'material-ui/transitions/Fade';
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
  middlePane: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
    width: 600,
  },
  panes: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center'
  },
  leftPane: {
    display: 'flex',
    // width: 390,
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
  flexContainer: {
    display: 'inline-flex',
    borderRadius: 8,
  },
  indicator: {
    background: 'white',
  },
  rootInheritSelected: {
    background: 'white !important',
    height: 75,
    color: 'green !important',
    fontWeight: 'bold',
  },
  wrapper: {
    flexDirection: 'row',
  },
  rootInherit: {
    margin: 10,
    borderRadius: 8,
    height: 60,
    width: 250,
    minWidth: 'initial',
    maxWidth: 'initia',
    color: '#eee',
    background: blueGrey[700],
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    opacity: 1,
  },
  labelContainer: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
  },
  span: {
    height: 18,
    background: 'initial',
  }
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
    const { activeTab, modalOpen,transactionInformation, selectedTransaction } = this.state;
    let message = null;
    if (this.props.message) {
      message = (
        <Snackbar open={this.state.snackOpen} close={this.closeSnackHandler} message={this.props.message} />
      );
    }
    const newTabClasses = {
      rootInherit: classes.rootInherit,
      rootInheritSelected: classes.rootInheritSelected,
      wrapper: classes.wrapper,
      labelContainer: classes.labelContainer,
    };
    return (
      <div className={classes.panes} >
        <div className={classes.leftPane}>
          <SearchTransaction itemSelected={this.itemSelectionChangedHandler} />
        </div>
        <div className={classes.middlePane}>
          <Fade in={activeTab === 'pooja' || activeTab === 'other'} timeout={500} mountOnEnter unmountOnExit>
            <Tabs classes={{
              root: classes.root,
              flexContainer: classes.flexContainer,
            }} value={activeTab}
              onChange={this.tabChangeHandler}
              indicatorClassName={classes.span}>
              <Tab classes={newTabClasses} value='pooja' label='Pooja' />
              <Tab classes={newTabClasses} value='other' label='Other' />
            </Tabs>
          </Fade>
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
