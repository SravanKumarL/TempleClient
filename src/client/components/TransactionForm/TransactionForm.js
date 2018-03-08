import React from 'react';

import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import Field from '../UI/Field/Field';


const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90%',
    height: '82vh',
    paddingTop: '10px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: 'white',
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

const transactionForm = (props) => {
  const { classes } = props;
  const formElementsArray = [];
  for (let key in props.transactionForm) {
    formElementsArray.push({
      id: key,
      config: props.transactionForm[key],
    });
  }
  return (
    <form className={classes.form} >
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
          changed={(event) => props.fieldChanged(event, formElement.id)}
        />
      ))}
      <div className={classes.buttonsContainer}>
        <Button onClick={props.preview} color='primary' raised size='large' className={classes.button}>
          Preview
        </Button>
        <Button onClick={props.reset} color='secondary' raised size='large' className={classes.button}>
          Reset
        </Button>
      </div>
    </form>
  );
}

export default withStyles(styles)(transactionForm);