import React from 'react';

import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Field from '../UI/Field/Field';
import { FIELDS, FIELD_TYPES } from '../../../store/constants/transactions';
import { Typography } from '@material-ui/core';

const { POOJA } = FIELDS;
const { INPUT, RADIO, DATE } = FIELD_TYPES;

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: 'white',
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {

    }
  },
  button: {
    margin: theme.spacing.unit,
    width: '100px',
    color: 'white',
    '&:hover': {
      boxShadow: '0px 0px 10px #000000',
      zIndex: 2,
      transition: 'all 200ms ease-in',
      transform: 'scale(1.1)',
    },
    [theme.breakpoints.up('lg')]: {
      width: '200px',
    }
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  section: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row-reverse'
  }
});
const getForm = ({ formElementsArray, fieldChanged, showLabels }) => {
  return formElementsArray.map(formElement => (
    formElement &&
    <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, width: '100%', justifyContent: 'center', padding: '0px 32px' }} key={formElement.id}>
      {formElement.config.elementType !== RADIO && formElement.config.elementType !== DATE && <Typography variant='body1'> {formElement.config.elementConfig.placeholder} </Typography>}
      <Field
        disabled={formElement.config.disabled}
        key={formElement.id}
        showLabels={showLabels}
        label={formElement.config.elementConfig.placeholder}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        shouldValidate={formElement.config.validation}
        invalid={!formElement.config.valid}
        multiline={formElement.id === POOJA && formElement.config.elementType === INPUT}
        touched={formElement.config.touched}
        changed={(event, ...restArgs) => fieldChanged(event, formElement.id, restArgs)}
        minDate={formElement.config.minDate}
      />
    </div>
  ));
}
const groupPairs = (formElementsArray) => {
  return formElementsArray.reduce((acc, value, index, array) => {
    if (index % 2 === 0) {
      acc = [...acc, [array[index], array[index + 1]]];
    }
    return acc;
  }, []);
}
const getFormsWithSections = ({ formElementsArray, fieldChanged, showLabels, classes }) => {
  const groupedPairs = groupPairs(formElementsArray);
  return groupedPairs.map(pair => {
    return <div className={classes.section}>
      {getForm({ formElementsArray: pair, fieldChanged, showLabels })}
    </div>
  });
}
const transactionForm = (props) => {
  const { classes, primaryText, showLabels, secondaryText, primaryIcon, fieldChanged, secondaryIcon, showButtons, disablePreview } = props;
  const formElementsArray = [];
  for (let key in props.transactionForm) {
    formElementsArray.push({
      id: key,
      config: props.transactionForm[key],
    });
  }
  return (
    <form className={classes.form} >
      {props.sections ? getFormsWithSections({ formElementsArray, fieldChanged, showLabels, classes }) : getForm({ formElementsArray, fieldChanged, showLabels })}
      {showButtons ?
        <div className={classes.buttonsContainer}>
          <Button onClick={props.primaryClicked} color='primary' disabled={disablePreview} variant='raised' size='large' className={classes.button}>
            {primaryIcon}
            {primaryText}
          </Button>
          <Button onClick={props.secondaryClicked} color='secondary' variant='raised' size='large' className={classes.button}>
            {secondaryIcon}
            {secondaryText}
          </Button>
        </div> : null}
    </form>
  );
}

export default withStyles(styles)(transactionForm);