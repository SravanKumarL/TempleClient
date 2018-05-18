import React from 'react';
import _ from 'lodash';
import withStyles from 'material-ui/styles/withStyles';
import { updateObject } from '../../../shared/utility';
import { convertToStartCase } from '../../../shared/utility';
import TransactionForm from '../../../components/TransactionForm/TransactionForm';

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
    width: '400px',
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
      elementType: 'number',
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
      elementType: 'input',
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
      elementType: 'input',
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
      elementType: 'input',
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
  componentWillReceiveProps(nextProps) {
    const { transaction } = nextProps;
    if (transaction) {
      const updatedForm = updateObject(this.state.editForm, {
        phoneNumber: { ...this.state.editForm.phoneNumber, value: transaction.phoneNumber },
        names: { ...this.state.editForm.names, value: transaction.names },
        gothram: { ...this.state.editForm.gothram, value: transaction.gothram },
        nakshatram: { ...this.state.editForm.nakshatram, value: transaction.nakshatram },
      });
      this.setState({ editForm: updatedForm, transaction });
    }
  }
  // inputChangedHandler = (event, inputIdentifier) => {
  //   const value = ['nakshatram', 'pooja', 'date', 'modeOfPayment'].includes(inputIdentifier) ? event : event.target.value;
  //   const updatedFormElement = updateObject(this.state.editForm[inputIdentifier], {
  //     value: value,
  //     valid: checkValidity(value, this.state.editForm[inputIdentifier].validation),
  //     touched: true,
  //   });
  //   let updatededitForm = updateObject(this.state.editForm, {
  //     [inputIdentifier]: updatedFormElement,
  //   });
  //   let formIsValid = true;
  //   for (let inputIdentifier in updatededitForm) {
  //     formIsValid = updatededitForm[inputIdentifier].valid && formIsValid;
  //   }
  //   updatededitForm[inputIdentifier] = updatedFormElement;
  //   this.setState({ editForm: updatededitForm, formIsValid, });
  // }
  // submitHandler = () => {
  //   let updatedTransaction = { ...this.state.transaction };
  //   updatedTransaction = updateObject(updatedTransaction, {
  //     phoneNumber: this.state.editForm.names.value,
  //     names: this.state.editForm.names.value,
  //     gothram: this.state.editForm.names.value,
  //     nakshatram: this.state.editForm.names.value,
  //   });
  //   this.props.editTransactionClicked(updatedTransaction);
  // }
  render() {
    const { classes, fieldChanged, editable } = this.props;
    const { editForm, transaction } = this.state;
    let fields = !editable ? Object.keys(transaction) : Object.keys(transaction).filter(field => Object.keys(editForm).indexOf(field) === -1);
    if (!transaction.others) fields = fields.filter(field => field !== 'others');
    fields = fields.filter(field => field !== 'id');
    let transactions = _.pick(transaction, fields);
    const readFieldState = {
      elementType: 'input',
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
    // let readOnlyContent = null;
    // if (transaction) {
    //   readOnlyContent =
    //     <div style={{ display: 'flex', flexDirection: 'column', width: '90%', marginTop: 10 }}>
    //       {Object.keys(transaction).map(key => {
    //         if (!['phoneNumber', 'names', 'gothram', 'nakshatram', '__v', '_id'].includes(key)) {
    //           return (
    //             <TableRow key={key}>
    //               <TableCell>{key}:</TableCell>
    //               <TableCell style={{ whiteSpace: 'pre-wrap', wordWrap: 'breafk-word' }}>{transaction[key]}</TableCell>
    //             </TableRow>
    //           )
    //         }
    //         return null;
    //       })}
    //     </div>
    // }
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
        {/* {readOnlyContent} */}
      </div>);
  }
};
export default withStyles(styles)(EditTransactions);