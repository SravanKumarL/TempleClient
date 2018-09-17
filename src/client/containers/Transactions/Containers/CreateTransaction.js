import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Pageview from '@material-ui/icons/Pageview';
import Restore from '@material-ui/icons/Restore';
import classNames from 'classnames';
import _ from 'lodash';

import withPoojaDetails from '../../../hoc/withPoojaDetails/withPoojaDetails';
import createContainer from '../../../hoc/createContainer/createContainer';
import TransactionForm from '../../../components/TransactionForm/TransactionForm';
import { formStateConfig, createTextField } from '../StateConfig';
import {
  updateObject,
  checkValidity,
  convertToStartCase,
} from '../../../shared/utility';
import { FIELDS, FIELD_TYPES, PAYMENT_MODES, FIELD_PLACEHOLDERS, SELECTED_DAYS, DATEPICKER_MODE } from '../../../../store/constants/transactions';
import { Button } from '@material-ui/core';


const { NAMES, GOTHRAM, PHONE_NUMBER, NAKSHATRAM, POOJA, DATES, NUMBER_OF_DAYS, AMOUNT, PAYMENT_MODE, CHEQUE_NO, BANK_NAME, TIME } = FIELDS;
const { CHEQUE } = PAYMENT_MODES;
const { INPUT, SINGLESELECT, NUMBER } = FIELD_TYPES;

const styles = theme => ({
  formContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
    height: '40px',
    width: '40%',
    '&:hover': {
      boxShadow: '0px 0px 10px #000000',
      zIndex: 2,
      transition: 'all 200ms ease-in',
      transform: 'scale(1.1)',
    },
    [theme.breakpoints.up('lg')]: {
      height: '40px',
      width: '200px',
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    boxSizing: 'border-box',
    [theme.breakpoints.up('lg')]: {
      boxShadow: theme.shadows[2],
    },
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    padding: '15px 0px'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
    margin: 5,
  },
});

const initialState = {
  transactionForm: formStateConfig(),
  formIsValid: false,
};


class CreateTransaction extends React.Component {
  constructor() {
    super();
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.formResetHandler = this.formResetHandler.bind(this);
    this.getUpdatedTransacationForm = this.getUpdatedTransacationForm.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  state = { ...JSON.parse(JSON.stringify(initialState)) };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { poojaDetails, selectedTransaction } = nextProps;
    let newFormElement = { ...prevState.transactionForm };
    let newState = { ...prevState };
    if (!_.isEqual(nextProps.poojaDetails, newState.poojaDetails)) {
      const options = Object.keys(poojaDetails).map(key => {
        return { value: key, label: convertToStartCase(key) }
      });
      newState.poojaDetails = nextProps.poojaDetails;
      newState.transactionForm.pooja.elementConfig.options = options;
    }
    if (selectedTransaction && !_.isEqual(selectedTransaction, prevState.selectedTransaction)) {
      newFormElement = updateObject(prevState.transactionForm, {
        phoneNumber: { ...prevState.transactionForm.phoneNumber, value: selectedTransaction.phoneNumber, valid: checkValidity(PHONE_NUMBER, selectedTransaction.phoneNumber), touched: true },
        names: { ...prevState.transactionForm.names, value: selectedTransaction.names, valid: checkValidity(NAMES, selectedTransaction.names), touched: true },
        gothram: { ...prevState.transactionForm.gothram, value: selectedTransaction.gothram, valid: checkValidity(GOTHRAM, selectedTransaction.gothram), touched: true },
        nakshatram: { ...prevState.transactionForm.nakshatram, value: selectedTransaction.nakshatram, valid: checkValidity(NAKSHATRAM, selectedTransaction.nakshatram), touched: true },
      });
      newState.selectedTransaction = selectedTransaction;
    }
    if (nextProps.activeTab !== newState.activeTab) {
      newState.activeTab = nextProps.activeTab;
      newFormElement[POOJA].value = '';
      newFormElement[POOJA].valid = false;
      newFormElement[AMOUNT].value = '';
      newFormElement[AMOUNT].valid = nextProps.activeTab === POOJA;
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
          value: newFormElement[DATES].value.length * (poojaDetails[newFormElement[POOJA].value] ? poojaDetails[newFormElement[POOJA].value].amount : 0) || 0,
          disabled: true,
        }),
        [TIME]: updateObject(newFormElement[TIME], {
          value: poojaDetails[newFormElement[POOJA].value] ? poojaDetails[newFormElement[POOJA].value].time : '12:00 AM to 12:00 AM',
          disabled: true,
        })
      });
    } else {
      newFormElement = updateObject(newFormElement, {
        [POOJA]: updateObject(newFormElement[POOJA], { elementType: INPUT, elementConfig: updateObject(newFormElement[POOJA].elementConfig, { placeholder: FIELD_PLACEHOLDERS.others }) }),
        [NUMBER_OF_DAYS]: updateObject(newFormElement[NUMBER_OF_DAYS], {
          value: newFormElement[DATES].value.length,
        }),
        [AMOUNT]: updateObject(newFormElement[AMOUNT], { disabled: false, validation: { required: true } })
      });
    }
    return { ...newState, transactionForm: newFormElement };
  }

  formResetHandler = () => {
    this.props.onDatepickerReset([], true);
    initialState.transactionForm[POOJA].elementConfig.options = this.state.transactionForm[POOJA].elementConfig.options;
    this.setState({ ...initialState });
  };
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
  inputChangedHandler = (event, inputIdentifier, restArgs) => {
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
    else if (inputIdentifier === DATES) {
      updatedtransactionForm[DATES][SELECTED_DAYS] = restArgs[0];
      updatedtransactionForm[DATES][DATEPICKER_MODE] = restArgs[1];
    }
    this.setState({ transactionForm: updatedtransactionForm });
  }
  getIsFormValid = (updatedTransactionForm = this.state.transactionForm) => {
    let formIsValid = true;
    for (let inputIdentifier in updatedTransactionForm) {
      formIsValid = updatedTransactionForm[inputIdentifier].valid && formIsValid;
    }
    return formIsValid;
  }
  submitHandler = () => {
    const transactionInformation = Object.keys(this.state.transactionForm).map(item => {
      const itemValue = this.state.transactionForm[item];
      const name = itemValue.elementConfig.placeholder;
      let value = itemValue.value;
      let currItem = { [`${item}`]: { value, name } };
      if (name === FIELD_PLACEHOLDERS.selectedDates) {
        currItem[item][DATEPICKER_MODE] = itemValue[DATEPICKER_MODE]
        currItem[item][SELECTED_DAYS] = itemValue[SELECTED_DAYS];
      }
      return currItem;
    }).reduce((acc, item) => Object.assign(acc, item));
    this.setState({ ...this.baseState });
    this.props.submit(transactionInformation);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.formContainer}>
        <div className={classes.container}>
          <TransactionForm
            transactionForm={this.state.transactionForm}
            fieldChanged={this.inputChangedHandler}
            showButtons={false}
          />
        </div>
        <div className={classes.buttonsContainer}>
          <Button onClick={this.submitHandler} color='primary' disabled={!this.getIsFormValid()} variant='raised' size='large' className={classes.button}>
            <Pageview className={classNames(classes.leftIcon, classes.iconSmall)} />
            Preview
          </Button>
          <Button onClick={this.formResetHandler} color='secondary' variant='raised' size='large' className={classes.button}>
            <Restore className={classNames(classes.leftIcon, classes.iconSmall)} />
            Reset
          </Button>
        </div>
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
