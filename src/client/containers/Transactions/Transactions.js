import React from 'react'
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
import EditTransactions from './Containers/EditTransactions';
import printHtml from 'print-html-element';
import RecentTransaction from './Containers/RecentTransaction';
import { HotKeys } from 'react-hotkeys';
import {
  updateObject,
  convertToStartCase,
  getFormattedDate,
  getCurrentDate
} from '../../shared/utility';
import {
  SELECTED_DAYS,
  DATEPICKER_MODE,
  FIELDS,
  DIALOG_OPERATIONS
} from '../../../store/constants/transactions';
import { TABS } from '../../../store/constants/transactions';

const { POOJAS, OTHERS } = TABS;

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'relative',
    flexShrink: 0,
    marginBottom: 20
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
    },
    [theme.breakpoints.up('lg')]: {
      alignItems: 'center',
      minWidth: '535px',
      maxWidth: '535px',
      marginLeft: 'auto'
    },
  },
  panes: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  leftPane: {
    display: 'flex',
  },
  rightPane: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
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
  },
  indicator: {
    background: 'white',
  },
  rootInheritSelected: {
    background: 'seagreen !important',
    height: 75,
    color: 'white !important',
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
    minHeight: 42,
    [theme.breakpoints.up('sm')]: {
      width: 250,
      height: 60,
    },
    minWidth: 'initial',
    maxWidth: 'initial',
    color: 'green',
    background: 'white',
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
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const initialState = {
  modalOpen: false,
  snackOpen: false,
  activeTab: POOJAS,
  transactionInformation: [],
  transaction: {},
  editedTransaction: {},
  usedTransaction: {},
  unchangedTransaction: {},
  option: '',
  editable: false,
  updates: {},
  message: null,
};
class Transactions extends React.Component {
  constructor() {
    super();
    this.printHandler = this.printHandler.bind(this);
    this.modalCloseHandler = this.modalCloseHandler.bind(this);
  }
  state = { ...initialState };
  keyMap = {
    'submit': 'alt+s',
    'reset': 'alt+r',
  }
  handlers = {
    'submit': () => this.CreateTransaction.submitHandler(),
    'reset': () => this.CreateTransaction.formResetHandler(),
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = { ...prevState };
    if (nextProps.message !== prevState.message) {
      newState = { ...newState, message: nextProps.message, snackOpen: true };
    }
    if (nextProps.usedTransaction && (nextProps.usedTransaction !== prevState.unchangedUsedTransaction)) {
      newState = { ...newState, usedTransaction: nextProps.usedTransaction, unchangedUsedTransaction: nextProps.usedTransaction }
    }
    if (nextProps.editedTransaction && (nextProps.editedTransaction !== prevState.unchangedEditedTransaction)) {
      newState = { ...newState, editedTransaction: nextProps.editedTransaction, unchangedEditedTransaction: nextProps.editedTransaction }
    }
    return newState;
  }
  closeSnackHandler = () => {
    this.setState({ snackOpen: false });
    this.props.addTransactionFail(null);
  }

  modalOpenHandler = () => this.setState({ modalOpen: true });

  modalCloseHandler = (operation) => () => {
    if (operation === 'close') {
      this.props.isPrintedChanged(false);
      this.setState({ modalOpen: false });
      this.CreateTransaction.formResetHandler();
      return;
      // return this.setState({ ...initialState });
    }
    return this.setState({ modalOpen: false })
  };
  tabChangeHandler = (event, value) => { this.setState({ activeTab: value, }); }

  printHandler = () => {
    const formattedDates = this.state.transactionInformation[FIELDS.DATES].value;
    if (this.props.isPrinted) {
      this.props.canBePrintedChanged(true);
      return;
    }
    this.props.commitEntityTransaction(constants.add,
      constants.Transactions, { ...this.state.transaction, [FIELDS.FORMATTED_DATES]: formattedDates });
    // this.modalCloseHandler();
    // this.setState({ ...initialState });

  }
  formSubmitHandler = (transactionInformation) => {
    const createdBy = this.props.user;
    let transaction = Object.keys(transactionInformation)
      .reduce((acc, item) => {
        let itemValue = transactionInformation[item];
        let value = itemValue.value;
        return Object.assign(acc, { [item]: value });
      }, {});
    transaction = { ...transaction, createdBy };
    if (this.state.activeTab === OTHERS) {
      transaction.others = true;
    } else {
      transaction.others = false;
    }
    let formattedTransactionInfo = _.cloneDeep(transactionInformation);
    {
      let dateValue = formattedTransactionInfo[FIELDS.DATES];
      const selectedDates = getFormattedDate(dateValue.value, dateValue[DATEPICKER_MODE]);
      const selectedDays = dateValue[SELECTED_DAYS];
      dateValue.value = `${selectedDates}${selectedDays.length === 7 ? '' : ` (${selectedDays.join(',')})`}`;
    }
    this.setState({ modalOpen: true, transactionInformation: formattedTransactionInfo, transaction });
  }
  closeDialogHandler = () => {
    this.setState((prevState) => ({ updates: {}, editable: false, selectedTransaction: prevState.unchangedTransaction }));
    this.props.usedTransactionChanged(null, '');
    this.props.editedTransactionChanged(null, '');
    !this.state.editable && this.props.openEditForm(false);
  }
  fieldEditedHandler = (event, inputIdentifier) => {
    let updates = { [inputIdentifier]: event.target ? event.target.value : event };
    const updatedEditedTransaction = updateObject(this.state.editedTransaction, updates);
    this.setState((prevState) => {
      if (prevState.unchangedEditedTransaction[inputIdentifier] === updates[inputIdentifier])
        updates = _.pickBy(prevState.updates, (value, key) => key !== inputIdentifier);
      else
        updates = { ...prevState.updates, ...updates };
      return { editedTransaction: updatedEditedTransaction, updates };
    });
  }
  onEditClicked = () => {
    const { updates, editedTransaction, editable } = this.state;
    if (editable && updates && Object.keys(updates).length > 0)
      this.props.commitEntityTransaction(constants.edit, constants.Transactions, updates, editedTransaction);
    this.setState((prevState) => ({ editable: !prevState.editable, updates: {} }));
  }
  render() {
    const { classes, editFormOpen, canBePrinted, isPrinted } = this.props;
    const { activeTab, modalOpen, transactionInformation, usedTransaction, editedTransaction, editable } = this.state;
    const PrimaryIcon = editable ? Save : ModeEdit;
    const primaryText = editable ? 'Save' : 'Edit';
    const SecondaryIcon = editable ? Undo : Close;
    const secondaryText = editable ? 'Back' : 'Close';
    if (canBePrinted) {
      this.props.canBePrintedChanged(false);
      this.props.isPrintedChanged(true);
      const printableElement = document.getElementById('transactionSummary');
      // const tableElement = document.getElementById('printHeader');
      // tableElement.style.marginBottom = '20px';
      printHtml.printElement(printableElement);
    }
    let dialog = (
      <Dialog
        open={editFormOpen}
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
          transaction={editedTransaction}
          fieldChanged={this.fieldEditedHandler}
        />
      </Dialog>
    );
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
    const createdBy = {
      name: 'Created By',
      value: this.props.user,
    };
    const createdDate = {
      name: 'Created Date',
      value: getCurrentDate(),
    }
    transactionInformation.createdBy = createdBy;
    transactionInformation.createdDate = createdDate;
    return (
      <HotKeys style={{ display: 'flex' }} keyMap={this.keyMap} handlers={this.handlers}>
        <div className={classes.panes} >
          <div className={classes.middlePane}>
            <Fade in={activeTab === POOJAS || activeTab === OTHERS} timeout={500} mountOnEnter unmountOnExit>
              <Tabs classes={{
                root: classes.root,
                flexContainer: classes.flexContainer,
                indicator: classes.span,
                scroller: classes.scroller,
              }} value={activeTab}
                onChange={this.tabChangeHandler}
              >
                <Tab classes={newTabClasses} value={POOJAS} label={convertToStartCase(POOJAS)} icon={<Event />} />
                <Tab classes={newTabClasses} value={OTHERS} label={convertToStartCase(OTHERS)} icon={<Description />} />
              </Tabs>
            </Fade>
            <CreateTransaction
              onRef={node => (this.CreateTransaction = node)}
              submit={this.formSubmitHandler}
              activeTab={activeTab}
              selectedTransaction={usedTransaction}
            />
            <TransactionSummary
              open={modalOpen}
              isPrinted={isPrinted}
              transactionFields={Object.values(transactionInformation)}
              createdBy={this.props.user}
              print={this.printHandler}
              summaryClosed={this.modalCloseHandler(isPrinted ? DIALOG_OPERATIONS.CLOSE : DIALOG_OPERATIONS.CANCEL)} />
            {message}
          </div>
          <RecentTransaction />
          <div className={classes.rightPane}>
            <SearchTransaction onRef={node => this.SearchTransaction = node} />
          </div>
          {dialog}
        </div >
      </HotKeys>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.transactions.message,
    user: state.auth.user,
    selectedTransaction: state.transactions.selectedTransaction,
    option: state.transactions.option,
    editFormOpen: state.transactions.editFormOpen,
    editedTransaction: state.transactions.editedTransaction,
    usedTransaction: state.transactions.usedTransaction,
    canBePrinted: state.transactions.canBePrinted,
    isPrinted: state.transactions.isPrinted,
  }
}

export default createContainer(withStyles(styles)(Transactions), mapStateToProps);
