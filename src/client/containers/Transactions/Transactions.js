import React from 'react'
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Fade from '@material-ui/core/Fade';
import Snackbar from '../../components/UI/Snackbar/Snackbar';
import Event from '@material-ui/icons/Event';
import Description from '@material-ui/icons/Description';
import ModeEdit from '@material-ui/icons/ModeEdit';
import Save from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';
import Undo from '@material-ui/icons/Undo';
import TransactionSummary from '../../components/TransactionSummary/TransacationSummary';
import CreateTransaction from './Containers/CreateTransaction';
import SearchTransaction from './Containers/SearchTransaction';
import createContainer from '../../hoc/createContainer/createContainer';
import Dialog from '../../components/UI/Dialog/Dialog';
import constants from '../../../store/sagas/constants';
import classNames from 'classnames';
import EditTransactions from './Components/EditTransactions';
import { updateObject } from '../../shared/utility';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'relative',
  },
  middlePane: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 'initial',
    maxWidth: 'initial',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      minWidth: '535px',
      maxWidth: '535px',
      marginLeft: 'auto'
    },
  },
  panes: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '1rem',
    }

  },
  leftPane: {
    display: 'flex',
  },
  rightPane: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      marginLeft: 'auto',
    }
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
    display: 'flex',
    borderRadius: 8,
    width: '100%',
    height: 92,
    [theme.breakpoints.up('sm')]: {
      height: 'initial',
    }
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
    fontSize: 16,
    width: '45%',
    height: 42,
    [theme.breakpoints.up('sm')]: {
      width: 250,
      height: 60,
    },
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
  },
  label: {
    fontSize: 16,
  },
  scroller: {
    overflow: 'initial',
  },
});

const initialState = {
  modalOpen: false,
  snackOpen: false,
  activeTab: 'pooja',
  transactionInformation: [],
  selectedTransaction: {},
  unchangedTransaction: {},
  dialogOpen: false,
  option: '',
  editable: false,
  updates: {}
};
class Transactions extends React.Component {
  state = { ...initialState };
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.message) {
      return { snackOpen: true };
    }
    return null;
  }
  closeSnackHandler = () => {
    this.setState({ snackOpen: false });
    this.props.addTransactionFail(null);
  }

  modalOpenHandler = () => this.setState({ modalOpen: true });

  modalCloseHandler = () => this.setState({ modalOpen: false });
  tabChangeHandler = (event, value) => { this.setState({ activeTab: value, }); }

  printHandler = () => {
    const createdBy = this.props.user;
    const { transactionInformation } = this.state;
    let transaction = Object.keys(this.state.transactionInformation)
      .reduce((acc, item) => {
        return Object.assign(acc, { [`${item}`]: transactionInformation[`${item}`]['value'] });
      }, {});
    transaction = { ...transaction, createdBy };
    if (this.state.activeTab === 'others') {
      transaction.others = true;
    } else {
      transaction.others = false;
    }
    this.props.commitTransaction(constants.add, constants.Transactions, transaction);
    this.modalCloseHandler();
    // window.print();
    // this.setState({ open: true });
  }

  itemSelectionChangedHandler = (option, selectedTransaction) => {
    if (option.toLowerCase() !== 'use') {
      this.setState({ dialogOpen: true });
    }
    this.setState({ option, selectedTransaction, unchangedTransaction: selectedTransaction });
  }
  formSubmitHandler = (transactionInformation) => {
    this.setState({ modalOpen: true, transactionInformation });
  }
  closeDialogHandler = () => {
    if (!this.state.editable)
      this.setState({ dialogOpen: false });
    this.setState((prevState) => ({ updates: {}, editable: false, selectedTransaction: prevState.unchangedTransaction }));
  }
  fieldEditedHandler = (event, inputIdentifier) => {
    let updates = { [inputIdentifier]: event.target.value };
    const updatedSelectedTransaction = updateObject(this.state.selectedTransaction, updates);
    this.setState((prevState) => {
      if (prevState.unchangedTransaction[inputIdentifier] === updates[inputIdentifier])
        updates = _.pickBy(prevState.updates, (value, key) => key !== inputIdentifier);
      else
        updates = { ...prevState.updates, ...updates };
      return { selectedTransaction: updatedSelectedTransaction, updates };
    });
  }
  onEditClicked = () => {
    const { updates, selectedTransaction, editable } = this.state;
    if (editable && updates && Object.keys(updates).length > 0)
      this.props.commitTransaction(constants.edit, constants.Transactions, updates, selectedTransaction);
    this.setState((prevState) => ({ editable: !prevState.editable, updates: {} }));
  }
  render() {
    const { classes } = this.props;
    const { activeTab, modalOpen, transactionInformation, selectedTransaction, option, dialogOpen, editable } = this.state;
    // const editForm = {
    //   phoneNumber: { ...transactionInformation.phoneNumber },
    //   names: { ...transactionInformation.names },
    //   gothram: { ...transactionInformation.gothram },
    //   nakshatram: { ...transactionInformation.nakshatram }
    // };
    const PrimaryIcon = editable ? Save : ModeEdit;
    const primaryText = editable ? 'Save' : 'Edit';
    const SecondaryIcon = editable ? Undo : Close;
    const secondaryText = editable ? 'Back' : 'Close';
    let dialog = (
      <Dialog
        open={dialogOpen}
        primaryClicked={this.onEditClicked}
        primaryText={primaryText}
        secondaryText={secondaryText}
        secondaryClicked={this.closeDialogHandler}
        primaryIcon={<PrimaryIcon className={classNames(classes.leftIcon, classes.iconSmall)} />}
        secondaryIcon={<SecondaryIcon className={classNames(classes.leftIcon, classes.iconSmall)} />}
        title='Edit Transaction'
        cancelled={this.closeDialogHandler}>
        <EditTransactions
          editable={editable}
          // transactionFormFields={editForm}
          transaction={selectedTransaction}
          fieldChanged={this.fieldEditedHandler}
        />
      </Dialog>
    );
    // if (option.toLowerCase() === 'view') {
    //   dialog = (
    //     <Dialog
    //       open={dialogOpen}
    //       primaryClicked={this.closeDialogHandler}
    //       primaryText='Close'
    //       primaryIcon={<Cancel className={classNames(classes.leftIcon, classes.iconSmall)} />}
    //       title='View Transaction'>
    //       <ViewTransactions
    //         transaction={selectedTransaction} />
    //     </Dialog>
    //   );
    // }
    let message = null;
    if (this.props.message) {
      message = (
        <Snackbar open={this.state.snackOpen} close={this.closeSnackHandler} message={this.props.message} />
      );
    }
    const newTabClasses = {
      textColorInherit: classes.rootInherit,
      selected: classes.rootInheritSelected,
      wrapper: classes.wrapper,
      labelContainer: classes.labelContainer,
      label: classes.label
    };
    return (
      <div className={classes.panes} >
        <div className={classes.middlePane}>
          <Fade in={activeTab === 'pooja' || activeTab === 'other'} timeout={500} mountOnEnter unmountOnExit>
            <Tabs classes={{
              root: classes.root,
              flexContainer: classes.flexContainer,
              indicator: classes.span,
              scroller: classes.scroller,
            }} value={activeTab}
              onChange={this.tabChangeHandler}
            >
              <Tab classes={newTabClasses} value='pooja' label='Pooja' icon={<Event />} />
              <Tab classes={newTabClasses} value='other' label='Other' icon={<Description />} />
            </Tabs>
          </Fade>
          <CreateTransaction
            submit={this.formSubmitHandler}
            activeTab={activeTab}
            selectedTransaction={selectedTransaction && option.toLowerCase() === 'use' ? selectedTransaction : null}
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
        {dialog}
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

export default createContainer(withStyles(styles)(Transactions), mapStateToProps);
