import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { isEmpty } from 'lodash';
import Pageview from '@material-ui/icons/Pageview';
import Restore from '@material-ui/icons/Restore';
import classNames from 'classnames';

import withPoojaDetails from '../../../hoc/withPoojaDetails/withPoojaDetails';
import createContainer from '../../../hoc/createContainer/createContainer';
import TransactionForm from '../../../components/TransactionForm/TransactionForm';
import { formStateConfig } from '../StateConfig';
import { updateObject, checkValidity, convertToStartCase } from '../../../shared/utility';

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
  }
  state = JSON.parse(JSON.stringify(initialState));
  componentWillReceiveProps(nextProps) {
    const { poojaDetails, selectedTransaction, activeTab } = nextProps;
    if (poojaDetails) {
      const options = Object.keys(poojaDetails).map(key => {
        const newkey = convertToStartCase(key);
        return { value: newkey, label: newkey }
      });
      initialState.transactionForm.pooja.elementConfig.options = options;
      const newFormElement = { ...this.state.transactionForm };
      newFormElement.pooja.elementConfig.options = options;
      this.setState({ transactionForm: newFormElement });
    }
    if (!isEmpty(selectedTransaction)) {
      const newFormElement = updateObject(this.state.transactionForm, {
        phoneNumber: { ...this.state.transactionForm.phoneNumber, value: selectedTransaction.phoneNumber },
        names: { ...this.state.transactionForm.names, value: selectedTransaction.names },
        gothram: { ...this.state.transactionForm.gothram, value: selectedTransaction.gothram },
        nakshatram: { ...this.state.transactionForm.nakshatram, value: selectedTransaction.nakshatram },
      });
      this.setState({ transactionForm: newFormElement });
    }
    if (activeTab !== this.props.activeTab) {
      this.getUpdatedFormElement(activeTab);
    }
  }
  getUpdatedFormElement = (activeTab) => {
    let updatedFormElement = { ...this.state.transactionForm };
    switch (activeTab) {
      case 'pooja':
        updatedFormElement = updateObject(updatedFormElement, {
          pooja: { ...updatedFormElement.pooja, elementType: 'singleselect', elementConfig: { ...updatedFormElement.pooja.elementConfig, placeholder: 'Poojas' } },
          amount: { ...updatedFormElement.amount, disabled: true },
        });
        break;
      case 'other':
        updatedFormElement = updateObject(updatedFormElement, {
          pooja: { ...updatedFormElement.pooja, elementType: 'input', elementConfig: { ...updatedFormElement.pooja.elementConfig, placeholder: 'Special Offerings' }, value: '' },
          amount: { ...updatedFormElement.amount, disabled: false, value: '' },
        });
        break;
      default:
        break;
    }
    this.setState({ transactionForm: updatedFormElement });
  }

  formResetHandler = () => this.setState({ ...initialState });

  inputChangedHandler = (event, inputIdentifier) => {
    let value = ['nakshatram', 'pooja', 'selectedDates', 'modeOfPayment'].includes(inputIdentifier) ? event : event.target.value;
    const { activeTab } = this.props;
    if (activeTab === 'other' && inputIdentifier === 'pooja') {
      value = event.target.value;
    }
    if (inputIdentifier === 'phoneNumber') {
      if (value.length > 10) {
        return;
      }
      if (!Number(value)) {
        return;
      }
    }
    const updatedFormElement = updateObject(this.state.transactionForm[inputIdentifier], {
      value: value,
      valid: checkValidity(value, this.state.transactionForm[inputIdentifier].validation),
      touched: true,
    });
    if (inputIdentifier === 'amount') {
      if (value === '') {
        updatedFormElement['amount'].valid = false;
      }
    }
    let updatedtransactionForm = updateObject(this.state.transactionForm, {
      [inputIdentifier]: updatedFormElement,
    });
    if (inputIdentifier === 'pooja') {
      updatedtransactionForm['amount'].disabled = false;
      if (!value) {
        updatedtransactionForm['amount'].value = '';
      } else {
        if (activeTab === 'other') {
          updatedtransactionForm['amount'].disabled = false;
          updatedtransactionForm['amount'].value = '';

        } else {
          const pooja = value.toLowerCase();
          updatedtransactionForm['amount'].value = Number(this.state.transactionForm.numberOfDays.value) * this.props.poojaDetails[`${pooja}`];
        }
      }
    }
    else if (inputIdentifier === 'selectedDates') {
      if (value) {
        updatedtransactionForm['numberOfDays'].value = value.length;
        updatedtransactionForm['amount'].value *= value.length;
      }
    }
    else if (inputIdentifier === 'modeOfPayment') {
      if (value === 'cheque') {
        updatedtransactionForm = updateObject(this.state.transactionForm, {
          chequeNo: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Cheque No',
            },
            validation: {
              required: true,
            },
            value: '',
            disabled: false,
            valid: false,
            touched: false,
          },
          bankName: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Bank Name',
            },
            validation: {
              required: true,
            },
            value: '',
            disabled: false,
            valid: false,
            touched: false,
          },
        });
      } else {
        const newForm = { ...this.state.transactionForm };
        delete newForm.chequeNo;
        delete newForm.bankName;
        updatedtransactionForm = newForm;
      }
    }
    let formIsValid = true;
    for (let inputIdentifier in updatedtransactionForm) {
      formIsValid = updatedtransactionForm[inputIdentifier].valid && formIsValid;
    }
    updatedtransactionForm[inputIdentifier] = updatedFormElement;
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
