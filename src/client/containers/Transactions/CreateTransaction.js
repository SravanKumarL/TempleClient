import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography/Typography';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import Field from '../../components/UI/Field/Field';
import Modal from '../../components/UI/Modal/Modal';
import TransactionSummary from '../../components/TransactionSummary/TransacationSummary';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity, getCurrentDate } from '../../shared/utility';



const styles = theme => ({
  transactRoot: {
    // margin: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '-15px'
  },
  tabRoot: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  search: {
    display: 'flex',
    marginLeft: 'auto'
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
  },
  textFieldRoot: {
    margin: 'auto',
    width: '250px',
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90%',
    height: '82vh',
    paddingTop: '10px',
    flexGrow: 1,
    color: 'white',
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: '250px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    marginBottom: '30px',
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
  root: {
    width: 250,
    marginBottom: 30,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
    width: '20%',
    '&:hover': {
      boxShadow: '0px 0px 10px #000000',
      zIndex: 2,
      transition: 'all 200ms ease-in',
      transform: 'scale(1.1)',
    },
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  }
});

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

class CreateTransaction extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({
        snackOpen: true,
      });
    }
  }
  state = {
    transactionForm: {
      phoneNumber: {
        elementType: 'number',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone Number',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLenght: 5,
          isNumber: true,
        },
        valid: false,
        disabled: false,
        touched: false,
      },
      names: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Names',
        },
        validation: {},
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
        value: '',
        valid: false,
        disabled: false,
        touched: false,
      },
      nakshatram: {
        elementType: 'multiselect',
        elementConfig: {
          type: 'text',
          placeholder: 'Nakshatram',
        },
        value: '',
        validation: {},
        valid: false,
        disabled: false,
        touched: false,
      },
      pooja: {
        elementType: 'select',
        elementConfig: {
          options: [{
            value: 'Ashtottaram',
          },
          {
            value: 'Sahasram',
          },],
          placeholder: 'Pooja'
        },
        value: '',
        disabled: false,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      from: {
        elementType: 'date',
        elementConfig: {
          type: 'text',
          placeholder: 'From',
        },
        value: getCurrentDate(),
        validation: {},
        valid: false,
        disabled: false,
        touched: false,
      },
      to: {
        elementType: 'date',
        elementConfig: {
          type: 'text',
          placeholder: 'To',
        },
        value: getCurrentDate(),
        validation: {},
        valid: false,
        disabled: false,
        touched: false,
      },
      numberOfDays: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'No of Days',
        },
        value: 1,
        validation: {},
        valid: false,
        disabled: true,
        touched: false,
      },
      amount: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Amount',
        },
        value: '',
        validation: {},
        valid: false,
        disabled: true,
        touched: false,
      },
    },
    formIsValid: false,
    // Needs to be moved to redux to fetch from API
    poojaDetails: {
      ashtottaram: 50,
      sahasram: 100,
    },
    previewModal: false,
    snackOpen: false,
    activeTab: 0,
  };
  closeSnackHandler = () => {
    this.setState({
      snackOpen: false,
    });
  }
  cancelClickHandler = () => {
    this.props.history.goBack();
  }
  transitionUp = (props) => {
    return <Slide direction="up" {...props} />;
  }
  // fromChangedHandler = (event, inputIdentifier) => {
  //   let dateElement = null;
  //   const isInPast = getDateDifference(getCurrentDate(), event.target.value) < 0;
  //   if (isInPast) {
  //     return;
  //   }
  //   dateElement = updateObject(this.state.transactionForm['to'], {
  //     value: event.target.value,
  //     validity: checkValidity(event.target.value, this.state.transactionForm['to'].validation),
  //     touched: true,
  //   });
  //   return dateElement;
  // }
  // toChangedHandler = (event, inputIdentifier) => {
  //   let dateElement = null;
  //   const numberOfDays = getDateDifference(this.state.transactionForm['from'].value, event.target.value);
  //   if (numberOfDays < 0) {
  //     return;
  //   }
  //   dateElement = updateObject(this.state.transactionForm['numberOfDays'], {
  //     value: numberOfDays + 1,
  //     validity: checkValidity(numberOfDays, this.state.transactionForm['numberOfDays'].validation),
  //     touched: true,
  //   });
  //   return dateElement;
  // }
  // poojaChangedHandler = (event, inputIdentifier) => {
  //   let amountElement = null;
  //   const amount = this.state.poojaDetails[`${event.target.value.toLowerCase()}`] * this.state.transactionForm['numberOfDays'].value;
  //   amountElement = updateObject(this.state.transactionForm['amount'], {
  //     value: amount ? amount : '',
  //     validity: checkValidity(amount, this.state.transactionForm['amount'].validation),
  //     touched: true,
  //   })
  //   return amountElement;
  // }
  inputChangedHandler = (event, inputIdentifier) => {
    const value = inputIdentifier === 'nakshatram' ? event : event.target.value;
    // switch (inputIdentifier) {
    //   // case 'from':
    //   //   updatedElement = this.fromChangedHandler(event, inputIdentifier);
    //   //   break;
    //   case 'pooja':
    //     updatedElement = this.poojaChangedHandler(event, inputIdentifier);
    //     break;
    //   // case 'to':
    //   //   updatedElement = this.toChangedHandler(event, inputIdentifier);
    //   //   break;
    //   default:
    //     updatedElement = updateObject(this.state.transactionForm[inputIdentifier], {
    //       value: value,
    //       valid: checkValidity(value, this.state.transactionForm[inputIdentifier].validation),
    //       touched: true,
    //     });
    //     break;
    // }

    const updatedFormElement = updateObject(this.state.transactionForm[inputIdentifier], {
      value: value,
      valid: checkValidity(value, this.state.transactionForm[inputIdentifier].validation),
      touched: true,
    });
    let updatedtransactionForm = updateObject(this.state.transactionForm, {
      [inputIdentifier]: updatedFormElement,
    });
    // if (inputIdentifier === 'pooja') {
    //   updatedtransactionForm = updateObject(updatedtransactionForm, {
    //     amount: amountElement,
    //   })
    // }
    // if (inputIdentifier === 'to') {
    //   updatedtransactionForm = updateObject(updatedtransactionForm, {
    //     numberOfDays: dateElement,
    //   })
    // }
    // if (inputIdentifier === 'from') {
    //   updatedtransactionForm = updateObject(updatedtransactionForm, {
    //     to: dateElement,
    //   })
    // }
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
  previewHandler = () => {
    this.setState({
      previewModal: true,
    });
  };
  closeHandler = () => {
    this.setState({
      previewModal: false,
    });
  }
  printHandler = () => {
    const { phoneNumber, names, gothram, nakshatram, pooja, from, to, numberOfDays, amount } = this.state.transactionForm;
    const createdBy = this.props.user;
    const transaction = {
      phoneNumber: phoneNumber.value,
      names: names.value,
      gothram: gothram.value,
      nakshatram: nakshatram.value,
      pooja: pooja.value,
      fromDate: from.value,
      toDate: to.value,
      numberOfDays: numberOfDays.value,
      amount: amount.value,
      createdBy: createdBy,
    }
    this.props.addTransaction(transaction);
    this.closeHandler();
    // window.print();
    // this.setState({ open: true });
  }
  tabChangeHandler = (event, value) => {
    let updatedFormElement = { ...this.state.transactionForm };
    switch (value) {
      case 0:
        updatedFormElement.pooja.elementType = 'select';
        updatedFormElement.amount.disabled = true;
        updatedFormElement.pooja.elementConfig.placeholder = 'Pooja';
        break;
      case 1:
        updatedFormElement.pooja.elementConfig.placeholder = 'Special Pooja';
        updatedFormElement.pooja.elementType = 'select';
        break;
      case 2:
        updatedFormElement.pooja.elementType = 'input';
        updatedFormElement.amount.disabled = false;
        updatedFormElement.amount.value = '';
        updatedFormElement.pooja.value = '';
        updatedFormElement.pooja.elementConfig.placeholder = 'Special Offerings';
        break;
      default:
        break;
    }
    this.setState({
      activeTab: value,
      transactionForm: updatedFormElement,
    });
  }
  getForm = () => {
    const { classes } = this.props;
    const formElementsArray = [];
    for (let key in this.state.transactionForm) {
      formElementsArray.push({
        id: key,
        config: this.state.transactionForm[key],
      });
    }
    return (
      <form className={classes.form} onSubmit={this.transactionForm}>
        {formElementsArray.map(formElement => (
          <Field
            disabled={formElement.config.disabled}
            key={formElement.id}
            label={formElement.config.elementConfig.placeholder}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            multiline={formElement.id === 'pooja' && formElement.config.elementType === 'input'}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <div className={classes.buttonsContainer}>
          <Button onClick={this.previewHandler} color='primary' raised size='large' className={classes.button}>
            Preview
        </Button>
          <Button onClick={this.cancelClickHandler} color='secondary' raised size='large' className={classes.button}>
            Cancel
        </Button>
        </div>
        {/* <Button disabled={!this.state.formIsValid} btnType='Success' clicked={this.orderHandler}>ORDER</Button> */}
      </form>
    );
  }
  getModal = () => {
    const { classes } = this.props;
    return (
      <Modal open={this.state.previewModal} closed={this.closeHandler} title='Transaction Summary'>
        <TransactionSummary createdBy={this.props.user} transactionFields={this.state.transactionForm} />
        <div className={classes.buttonsContainer}>
          <Button raised className={classes.button} color='primary' onClick={this.printHandler}> Print </Button>
          <Button raised className={classes.button} color='secondary' onClick={this.closeHandler}> Cancel </Button>
        </div>
      </Modal>
    );
  }

  getMessage = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={this.state.snackOpen}
        autoHideDuration='1000'
        onClose={this.closeSnackHandler}
        transition={this.transitionUp}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.message}</span>}
      />
    );
  }

  getTab = () => {
    const { classes } = this.props;
    const { activeTab } = this.state;
    let form = this.getForm();
    return (
      <Fragment>
        <Paper className={classes.tabRoot}>
          <Tabs value={activeTab} onChange={this.tabChangeHandler} fullWidth>
            <Tab label="Pooja" />
            <Tab label="Special Pooja" />
            <Tab label="Other" />
          </Tabs>
        </Paper>
        <TabContainer>
          <div className={classes.container}>
            {form}
          </div>
        </TabContainer >
      </Fragment>
    );
  }
  render() {
    const { classes } = this.props;
    const tab = this.getTab();
    let modal = null;
    if (this.state.previewModal) {
      modal = this.getModal();
    }
    let message = null;
    if (this.props.message) {
      message = this.getMessage();
    }
    return (
      <div className={classes.transactRoot}>
        {tab}
        {modal}
        {message}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    message: state.transactions.message,
    user: state.auth.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTransaction: (transaction) => {
      dispatch(actions.addTransaction(transaction))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateTransaction)));
