import React from 'react';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import { updateObject } from '../../../shared/utility';
import { convertToStartCase } from '../../../shared/utility';
import TransactionForm from '../../../components/TransactionForm/TransactionForm';
import { FIELDS, FIELD_TYPES } from '../../../../store/constants/transactions';

const { INPUT, NUMBER } = FIELD_TYPES;
const { ID, OTHERS } = FIELDS;
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
      elementType: INPUT,
      elementConfig: {
        type: 'text',
        placeholder: 'Nakshatram',
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
};

class EditTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      transaction: props.transaction,
    }
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

  render() {
    const { classes, fieldChanged, editable } = this.props;
    const { editForm, transaction } = this.state;
    let fields = !editable ? Object.keys(transaction) : Object.keys(transaction).filter(field => Object.keys(editForm).indexOf(field) === -1);
    if (!transaction.others) fields = fields.filter(field => field !== OTHERS);
    fields = fields.filter(field => field !== ID);
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
    return (
      <div className={classes.container}>
        <TransactionForm
          transactionForm={resultantEditForm}
          showLabels={true}
          fieldChanged={fieldChanged}
          showButtons={false}
          primaryText='Edit'
          secondaryText='Cancel'
        />
      </div>);
  }
};
export default withStyles(styles)(EditTransactions);