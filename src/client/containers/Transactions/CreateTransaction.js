import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography/Typography';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import Snackbar from '../../components/UI/Snackbar/Snackbar';
import TransactionSummary from '../../components/TransactionSummary/TransacationSummary';
import TransactionForm from '../../components/TransactionForm/TransactionForm';

import * as actions from '../../../store/actions';
import { updateObject, checkValidity, getCurrentDate, convertToStartCase } from '../../shared/utility';


const styles = theme => ({
  root: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '-15px'
  },
  tabRoot: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
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
  constructor() {
    super();
    this.baseState = this.state;
  }

  componentDidMount() {
    this.props.getPoojaDetails();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({
        snackOpen: true,
      });
    }
    if (nextProps.poojaDetails) {
      let poojaDetails = nextProps.poojaDetails.map(item => ({
        [`${item.poojaName}`]: item.amount,
      }));
      poojaDetails = poojaDetails.reduce(function (acc, item) {
        return Object.assign(acc, item);
      }, {});

      const options = Object.keys(poojaDetails).map(key => {
        const newkey = convertToStartCase(key);
        return {
          value: newkey,
          label: newkey,
        }
      });
      const newFormElement = { ...this.state.transactionForm };
      newFormElement.pooja.elementConfig.options = options;
      this.setState({ poojaDetails, transactionForm: newFormElement });
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
          isPhoneNumber: true,
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
        value: '',
        validation: {
          required: true,
        },
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
        validation: {
          required: true,
        },
        valid: false,
        disabled: false,
        touched: false,
      },
      pooja: {
        elementType: 'singleselect',
        elementConfig: {
          options: [],
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
      date: {
        elementType: 'date',
        elementConfig: {
          type: 'text',
          placeholder: 'Select Date(s)',
        },
        value: getCurrentDate(),
        validation: {
          required: true,
        },
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
        validation: {
          required: true,
        },
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
        validation: {
          required: true,
        },
        valid: false,
        disabled: true,
        touched: false,
      },
    },
    formIsValid: false,
    // Needs to be moved to redux to fetch from API
    poojaDetails: null,
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

  previewHandler = () => {
    this.setState({
      previewModal: true,
    });
  };

  modalCloseHandler = () => {
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
    this.modalCloseHandler();
    // window.print();
    // this.setState({ open: true });
  }

  tabChangeHandler = (event, value) => {
    let updatedFormElement = { ...this.state.transactionForm };
    switch (value) {
      case 0:
        updatedFormElement.pooja.elementType = 'singleselect';
        updatedFormElement.amount.disabled = true;
        updatedFormElement.pooja.elementConfig.placeholder = 'Pooja';
        break;
      case 1:
        updatedFormElement.pooja.elementConfig.placeholder = 'Special Pooja';
        updatedFormElement.pooja.elementType = 'singleselect';
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

  getMessage = () => {
    return (
      <Snackbar
        open={this.state.snackOpen}
        close={this.closeSnackHandler}
        message={this.props.message}
      />
    );
  }

  getTab = () => {
    const { classes } = this.props;
    const { activeTab } = this.state;
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
            <TransactionForm
              transactionForm={this.state.transactionForm}
              fieldChanged={this.inputChangedHandler}
              preview={this.previewHandler}
              cancel={this.cancelClickHandler}
            />
          </div>
        </TabContainer >
      </Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    const tab = this.getTab();
    let message = null;
    if (this.props.message) {
      message = this.getMessage();
    }
    return (
      <div className={classes.root}>
        {tab}
        <TransactionSummary
          open={this.state.previewModal}
          transactionFields={this.state.transactionForm}
          createdBy={this.props.user}
          print={this.printHandler}
          summaryClosed={this.modalCloseHandler} />
        {message}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.transactions.message,
    user: state.auth.user,
    poojaDetails: state.poojas.poojaDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTransaction: (transaction) => {
      dispatch(actions.addTransaction(transaction))
    },
    getPoojaDetails: () => {
      dispatch(actions.getPoojaDetails());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateTransaction)));
