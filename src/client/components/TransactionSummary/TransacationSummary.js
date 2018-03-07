import React from 'react';

import withStyles from 'material-ui/styles/withStyles';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography/Typography';
import Button from 'material-ui/Button';

import Modal from '../../components/UI/Modal/Modal';

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
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
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
});

const transactionSummary = (props) => {
  const { classes, open, transactionFields, summaryClosed, print, createdBy } = props;
  return (
    <Modal open={open} closed={summaryClosed} title='Transaction Summary'>
      <div className={classes.container}>
        <FormGroup className={classes.content}>
          {Object.keys(transactionFields).map(id => {
            const field = transactionFields[id];
            const placeholder = field.name;
            return (<FormControlLabel
              className={classes.formLabel}
              key={id}
              control={
                <Typography style={{ marginLeft: '30px' }} align='center' type="subheading">
                  {field.value}
                </Typography>
              }
              label={`${placeholder} :      `}
            />);
          })}
          <FormControlLabel
            className={classes.formLabel}
            control={
              <Typography style={{ marginLeft: '30px' }} align='center' type="subheading"> {createdBy}</Typography>
            }
            label={`CreatedBy :      `}
          />
        </FormGroup>
      </div>
      <div className={classes.buttonsContainer}>
        <Button raised className={classes.button} color='primary' onClick={print}> Print </Button>
        <Button raised className={classes.button} color='secondary' onClick={summaryClosed}> Cancel </Button>
      </div>
    </Modal>
  )
};

export default withStyles(styles)(transactionSummary);