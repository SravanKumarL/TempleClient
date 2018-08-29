import React from 'react';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import { updateObject } from '../../../shared/utility';
import { convertToStartCase } from '../../../shared/utility';
import TransactionForm from '../../../components/TransactionForm/TransactionForm';
import { FIELDS, FIELD_TYPES } from '../../../../store/constants/transactions';
import { Button } from '@material-ui/core';
import Print from '@material-ui/icons/Print';
import createContainer from '../../../hoc/createContainer/createContainer';
import TransactionSummary from '../../../components/TransactionSummary/TransacationSummary';
import printHtml from 'print-html-element';
import { FIELD_PLACEHOLDERS, NAKSHATRAMS } from '../../../../store/constants/transactions';
const displayNames = { ...FIELD_PLACEHOLDERS, selectedDates: 'Selected Dates', createdBy: 'Created By', createdDate: 'Created Date', formattedDates: 'Dates' };

const { INPUT, MULTISELECT, NUMBER } = FIELD_TYPES;
const { ID, OTHERS, DATES } = FIELDS;
const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  table: {
    minWidth: 400,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
    alignItems: 'center',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 1px 1px #D3D3D3',
    height: '90%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 4
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 20,
  },
});

const initialState = {
  editForm: {
    phoneNumber: {
      elementType: NUMBER,
      elementConfig: {
        type: 'text',
        placeholder: 'Phone Number',
      },
      validation: {
        required: true,
      },
      value: '',
      disabled: false,
      valid: false,
      touched: false,
    },
    names: {
      elementType: INPUT,
      elementConfig: {
        type: 'text',
        placeholder: 'Names',
      },
      validation: {
        required: true,
      },
      value: '',
      disabled: false,
      valid: false,
      touched: false,
    },
    gothram: {
      elementType: INPUT,
      elementConfig: {
        type: 'text',
        placeholder: 'Gothram',
      },
      validation: {
        required: true,
      },
      value: '',
      disabled: false,
      valid: false,
      touched: false,
    },
    nakshatram: {
      elementType: MULTISELECT,
      elementConfig: {
        type: 'text',
        placeholder: 'Nakshatram',
        options: NAKSHATRAMS
      },
      validation: {
        required: true,
      },
      value: '',
      disabled: false,
      valid: false,
      touched: false,
    }
  },
  transaction: null,
  printNow: false,
  modalOpen: false,
};

class EditTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      transaction: props.transaction,
    }
    this.printHandler = this.printHandler.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { transaction } = nextProps;
    if (transaction) {
      const updatedForm = updateObject(prevState.editForm, {
        phoneNumber: { ...prevState.editForm.phoneNumber, value: transaction.phoneNumber },
        names: { ...prevState.editForm.names, value: transaction.names },
        gothram: { ...prevState.editForm.gothram, value: transaction.gothram },
        nakshatram: { ...prevState.editForm.nakshatram, value: transaction.nakshatram },
      });
      return { editForm: updatedForm, transaction };
    }
    return null;
  }

  printClickedHandler = () => {
    this.setState({ printNow: true, modalOpen: true })
  };
  modalCloseHandler = () => {
    this.setState({ modalOpen: false });
  }

  printHandler = () => {
    this.modalCloseHandler();
    const printableElement = document.getElementById('transactionSummary');
    const headerElement = document.getElementById('printHeader');
    headerElement.style.marginTop = '60px';
    headerElement.style.marginBottom = '60px';
    printHtml.printElement(printableElement);

    // printHtml.printElement(document.getElementById('transactionSummary'));
  }
  render() {
    const { classes, fieldChanged, editable } = this.props;
    const { editForm } = this.state;
    let { transaction } = this.state;
    let fields = !editable ? Object.keys(transaction) : Object.keys(transaction).filter(field => Object.keys(editForm).indexOf(field) === -1);
    if (!transaction.others) fields = fields.filter(field => field === OTHERS ? null : field);
    fields = fields.filter(field => (field === ID || field === DATES) ? null : field);
    let transactions = _.pick(transaction, fields);
    const readFieldState = {
      elementType: INPUT,
      elementConfig: {
        type: 'text',
        placeholder: '',
      },
      validation: {
        required: false,
      },
      value: '',
      disabled: true,
      valid: true,
      touched: false,
    };
    Object.keys(transactions).forEach((field =>
      transactions[field] = { ...readFieldState, elementConfig: { ...readFieldState.elementConfig, placeholder: convertToStartCase(field) }, value: transactions[field] }));
    const resultantEditForm = editable ? ({ ...editForm, ...transactions }) : transactions;
    const transactionInfo = _.without(Object.keys(transaction).map(key => { const obj = (key !== 'id' || key !== 'selectedDates') ? { name: displayNames[key], value: transaction[key] } : null; return obj; }), null);
    return (
      <div className={classes.container}>
        {!editable ? <Button style={{ margin: 10 }} variant='raised' color='primary' onClick={this.printClickedHandler}>
          <Print className={classes.leftIcon} />
          Print
      </Button> : null}
        {this.state.printNow ?
          <TransactionSummary
            open={this.state.modalOpen}
            transactionFields={transactionInfo}
            modifiedBy={this.props.user}
            print={this.printHandler}
            summaryClosed={this.modalCloseHandler} /> : null}
        <TransactionForm
          transactionForm={resultantEditForm}
          fieldChanged={fieldChanged}
          showButtons={false}
          primaryText='Edit'
          secondaryText='Cancel'
        />
      </div>);
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default createContainer(withStyles(styles)(EditTransactions), mapStateToProps);