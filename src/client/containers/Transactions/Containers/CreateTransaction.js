import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Pageview from '@material-ui/icons/Pageview';
import Restore from '@material-ui/icons/Restore';
import classNames from 'classnames';

import withPoojaDetails from '../../../hoc/withPoojaDetails/withPoojaDetails';
import createContainer from '../../../hoc/createContainer/createContainer';
import TransactionForm from '../../../components/TransactionForm/TransactionForm';
import { formStateConfig, createTextField } from '../StateConfig';
import { updateObject, checkValidity, convertToStartCase } from '../../../shared/utility';
import { FIELDS, FIELD_TYPES, PAYMENT_MODES, FIELD_PLACEHOLDERS } from '../../../../store/constants/transactions';


const { PHONE_NUMBER, NAKSHATRAM, POOJA, DATES, NUMBER_OF_DAYS, AMOUNT, PAYMENT_MODE, CHEQUE_NO, BANK_NAME } = FIELDS;
const { CHEQUE } = PAYMENT_MODES;
const { INPUT, SINGLESELECT, NUMBER } = FIELD_TYPES;

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    boxSizing: 'border-box',
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 10,
    }
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const initialState = {
  transactionForm: formStateConfig(),
  formIsValid: false,
  disablePreview: true,
};


class CreateTransaction extends React.Component {
  constructor() {
    super();
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.formResetHandler = this.formResetHandler.bind(this);
    this.getUpdatedTransacationForm = this.getUpdatedTransacationForm.bind(this);
  }
  state = JSON.parse(JSON.stringify(initialState));

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { poojaDetails, selectedTransaction } = nextProps;
    let newFormElement = { ...prevState.transactionForm };
    let newState = { ...prevState };
    if (nextProps.poojaDetails !== prevState.transactionForm.pooja.elementConfig.options) {
      const options = Object.keys(poojaDetails).map(key => {
        const newkey = convertToStartCase(key);
        return { value: newkey, label: newkey }
      });
      initialState.transactionForm.pooja.options = options;
      newFormElement.pooja.elementConfig.options = options;
      newFormElement.amount.valid = true;
    }
    if (selectedTransaction && selectedTransaction !== prevState.selectedTransaction) {
      newFormElement = updateObject(prevState.transactionForm, {
        phoneNumber: { ...prevState.transactionForm.phoneNumber, value: selectedTransaction.phoneNumber },
        names: { ...prevState.transactionForm.names, value: selectedTransaction.names },
        gothram: { ...prevState.transactionForm.gothram, value: selectedTransaction.gothram },
        nakshatram: { ...prevState.transactionForm.nakshatram, value: selectedTransaction.nakshatram },
      });
      newState.selectedTransaction = selectedTransaction;
    }
    if (nextProps.activeTab !== newState.activeTab) {
      newState.activeTab = nextProps.activeTab;
      newState.transactionForm[POOJA].value = '';
    }
    if (nextProps.activeTab === POOJA) {
      newFormElement = updateObject(newFormElement, {
        [POOJA]: updateObject(newFormElement[POOJA], {
          elementType: SINGLESELECT,
          elementConfig: updateObject(newFormElement[POOJA].elementConfig, {
            placeholder: FIELD_PLACEHOLDERS.pooja
          }),
        }),
        [NUMBER_OF_DAYS]: updateObject(newFormElement[NUMBER_OF_DAYS], {
          value: newFormElement[DATES].value.length,
        }),
        [AMOUNT]: updateObject(newFormElement[AMOUNT], {
          value: newFormElement[NUMBER_OF_DAYS].value * poojaDetails[newFormElement[POOJA].value ? newFormElement[POOJA].value.toLowerCase() : newFormElement[POOJA].value] || 0,
          disabled: true,
        }),
      });
    } else {
      newFormElement = updateObject(newFormElement, {
        [POOJA]: updateObject(newFormElement[POOJA], { elementType: INPUT, elementConfig: updateObject(newFormElement[POOJA].elementConfig, { placeholder: FIELD_PLACEHOLDERS.others }) }),
        [AMOUNT]: updateObject(newFormElement[AMOUNT], { disabled: false, value: 0 })
      });
    }
    return { ...newState, transactionForm: newFormElement };
  }
  formResetHandler = () => this.setState({ ...initialState });
  canPhoneNumberBeUpdated = (value) => (!(!Number(value) || value.charAt(value.length - 1) === '.' || value.length > 10));
  updatedFormElement = (inputIdentifier, value) => updateObject(this.state.transactionForm[inputIdentifier], {
    value: value,
    valid: checkValidity(value, this.state.transactionForm[inputIdentifier].validation),
    touched: true,
  });
  getUpdatedTransacationForm = (value, form) => {
    let updatedTransactionForm;
    if (value === CHEQUE) {
      updatedTransactionForm = updateObject(form, {
        chequeNo: createTextField(CHEQUE_NO, NUMBER, { required: true }),
        bankName: createTextField(BANK_NAME, INPUT, { required: true }),
      });
    } else {
      const newForm = { ...form };
      delete newForm.chequeNo;
      delete newForm.bankName;
      updatedTransactionForm = newForm;
    }
    return updatedTransactionForm;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    let value = [NAKSHATRAM, POOJA, DATES, PAYMENT_MODE].includes(inputIdentifier) ? event : event.target.value;
    if (inputIdentifier === POOJA && this.state.transactionForm.pooja.elementConfig.placeholder === FIELD_PLACEHOLDERS.others) {
      value = event.target.value;
    }
    let updatedFormElement;
    let updatedtransactionForm = { ...this.state.transactionForm };
    if (inputIdentifier === PHONE_NUMBER && !this.canPhoneNumberBeUpdated(value) && value !== '') {
      return;
    }
    updatedFormElement = this.updatedFormElement(inputIdentifier, value);
    updatedtransactionForm = updateObject(this.state.transactionForm, {
      [inputIdentifier]: updatedFormElement,
    });
    if (inputIdentifier === PAYMENT_MODE) {
      updatedtransactionForm = this.getUpdatedTransacationForm(value, updatedtransactionForm);
    }
    let formIsValid = true;
    for (let inputIdentifier in updatedtransactionForm) {
      formIsValid = updatedtransactionForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ transactionForm: updatedtransactionForm, disablePreview: !formIsValid, });
  }
  submitHandler = () => {
    const transactionInformation = Object.keys(this.state.transactionForm).map(item => {
      return { [`${item}`]: { value: this.state.transactionForm[item].value, name: this.state.transactionForm[item].elementConfig.placeholder } }
    }).reduce((acc, item) => {
      return Object.assign(acc, item);
    });
    this.setState({ ...this.baseState });
    this.props.submit(transactionInformation);
  }
  render() {
    const { classes } = this.props;
    const { disablePreview } = this.state;
    return (
      <div className={classes.container}>
        <TransactionForm
          disablePreview={disablePreview}
          transactionForm={this.state.transactionForm}
          fieldChanged={this.inputChangedHandler}
          primaryClicked={this.submitHandler}
          showButtons={true}
          secondaryClicked={this.formResetHandler}
          primaryText='Preview'
          secondaryText='Reset'
          primaryIcon={<Pageview className={classNames(classes.leftIcon, classes.iconSmall)} />}
          secondaryIcon={<Restore className={classNames(classes.leftIcon, classes.iconSmall)} />}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    poojaDetails: state.poojas.rows,
  }
}

export default createContainer(withPoojaDetails(withStyles(styles)(CreateTransaction), mapStateToProps));
