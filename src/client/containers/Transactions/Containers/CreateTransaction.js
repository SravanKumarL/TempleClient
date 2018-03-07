import React from 'react'
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import withPoojaDetails from '../../../hoc/withPoojaDetails/withPoojaDetails';
import TransactionForm from '../../../components/TransactionForm/TransactionForm';
import { formStateConfig } from '../StateConfig';
import { updateObject, checkValidity, convertToStartCase } from '../../../shared/utility';

const styles = theme => ({
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
});

class CreateTransaction extends React.Component {
  constructor() {
    super();
    this.baseState = this.state;
  }
  state = {
    transactionForm: formStateConfig(),
    formIsValid: false,
    poojaDetails: null,
  };
  componentWillReceiveProps(nextProps) {
    const { poojaDetails } = nextProps;
    if (poojaDetails) {
      const options = Object.keys(poojaDetails).map(key => {
        const newkey = convertToStartCase(key);
        return {
          value: newkey,
          label: newkey,
        }
      });
      const newFormElement = { ...this.state.transactionForm };
      newFormElement.pooja.elementConfig.options = options;
      this.setState({ transactionForm: newFormElement, poojaDetails });

    }
  }
  formResetHandler = () => {
    this.setState({ ...this.baseState })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const value = inputIdentifier === 'nakshatram' || inputIdentifier === 'pooja' ? event : event.target.value;
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
        updatedtransactionForm['amount'].value = this.state.poojaDetails[`${pooja}`];
      }
    }
    let formIsValid = true;
    for (let inputIdentifier in updatedtransactionForm) {
      formIsValid = updatedtransactionForm[inputIdentifier].valid && formIsValid;
    }
    updatedtransactionForm[inputIdentifier] = updatedFormElement;
    this.setState({
      transactionForm: updatedtransactionForm,
      formIsValid,
    });
  }
  submitHandler = () => {
    const transactionInformation = Object.keys(this.state.transactionForm).map(item => {
      return { [`${item}`]: { value: this.state.transactionForm[item].value, name: this.state.transactionForm[item].elementConfig.placeholder } }
    }).reduce((acc, item) => {
      return Object.assign(acc, item);
    });
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
    poojaDetails: state.poojas.poojaDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPoojaDetails: () => {
      dispatch(actions.getPoojaDetails());
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withPoojaDetails(withStyles(styles)(CreateTransaction))));
