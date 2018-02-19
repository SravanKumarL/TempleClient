import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography/Typography';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '8px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formLabel: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-start',
    margin: '10px',
  }
});

const transactionSummary = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <FormGroup column className={classes.content}>
        {Object.keys(props.transactionFields).map(id => {
          const field = props.transactionFields[id];
          const placeholder = id === 'amount' ? 'Amount' : field.elementConfig.placeholder;
          return (<FormControlLabel
            className={classes.formLabel}
            key={id}
            control={
              <Typography style={{ marginLeft: '30px' }} align='center' type="subheading"> {field.value}</Typography>
            }
            label={`${placeholder} :      `}
          />);
        })}
        <FormControlLabel
          className={classes.formLabel}
          control={
            <Typography style={{ marginLeft: '30px' }} align='center' type="subheading"> {props.createdBy}</Typography>
          }
          label={`CreatedBy :      `}
        />
      </FormGroup>
    </div>
  )
};

export default withStyles(styles)(transactionSummary);