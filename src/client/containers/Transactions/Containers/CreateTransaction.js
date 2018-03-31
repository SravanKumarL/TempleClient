import React from 'react'
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import * as actions from '../../../../store/actions';
import withPoojaDetails from '../../../hoc/withPoojaDetails/withPoojaDetails';
import TransactionForm from '../../../components/TransactionForm/TransactionForm';
import { formStateConfig } from '../StateConfig';
import { updateObject, checkValidity, convertToStartCase } from '../../../shared/utility';
import constants from '../../../../store/sagas/constants'
const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // margin: 'auto',
    width: '535px',
    alignItems: 'center',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 1px 1px #D3D3D3',
    height: '90%',
    backgroundColor: theme.palette.background.paper,
  },
});

class CreateTransaction extends React.Component {
  constructor() {
    super();
    this.baseState = { ...this.state };
  }
  state = {
    transactionForm: formStateConfig(),
    formIsValid: false,
  };
  componentWillReceiveProps(nextProps) {
    const { poojaDetails, selectedTransaction, activeTab } = nextProps;
    if (poojaDetails) {
      const options = Object.keys(poojaDetails).map(key => {
        const newkey = convertToStartCase(key);
        return { value: newkey, label: newkey }
      });
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
          pooja: { ...updatedFormElement.pooja, elementType: 'singleselect', elementConfig: { ...updatedFormElement.pooja.elementConfig, placeholder: 'Special Offerings' } },
          amount: { ...updatedFormElement.amount, disabled: false },
        });
        break;
      case 'other':
        updatedFormElement = updateObject(updatedFormElement, {
          pooja: { ...updatedFormElement.pooja, elementType: 'textarea', elementConfig: { ...updatedFormElement.pooja.elementConfig, placeholder: 'Special Offerings' }, value: '' },
          amount: { ...updatedFormElement.amount, disabled: false, value: '' },
        });
        break;
      default:
        break;
    }
    this.setState({ transactionForm: updatedFormElement });
  }
  formResetHandler = () => this.setState({ ...this.baseState });

  inputChangedHandler = (event, inputIdentifier) => {
    const value = ['nakshatram', 'pooja', 'selectedDates', 'modeOfPayment'].includes(inputIdentifier) ? event : event.target.value;
    const updatedFormElement = updateObject(this.state.transactionForm[inputIdentifier], {
      value: value,
      valid: checkValidity(value, this.state.transactionForm[inputIdentifier].validation),
      touched: true,
    });
    let updatedtransactionForm = updateObject(this.state.transactionForm, {
      [inputIdentifier]: updatedFormElement,
    });
    if (inputIdentifier === 'pooja') {
      if (!value) {
        updatedtransactionForm['amount'].value = '';
      } else {
        const pooja = value.toLowerCase();
        updatedtransactionForm['amount'].value = Number(this.state.transactionForm.numberOfDays.value) * this.props.poojaDetails[`${pooja}`];
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
    this.setState({ transactionForm: updatedtransactionForm, formIsValid, });
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
    return (
      <div className={classes.container}>
        <TransactionForm
          transactionForm={this.state.transactionForm}
          fieldChanged={this.inputChangedHandler}
          preview={this.submitHandler}
          reset={this.formResetHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    poojaDetails: state.poojas.rows,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPoojaDetails: () => { dispatch(actions.fetchData(constants.Poojas)); },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withPoojaDetails(withStyles(styles)(CreateTransaction))));
