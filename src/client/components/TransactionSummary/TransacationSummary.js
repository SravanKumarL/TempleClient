import React from 'react';

import withStyles from 'material-ui/styles/withStyles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Dialog from '../../components/UI/Dialog/Dialog';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
});

const transactionSummary = (props) => {
  const { classes, open, transactionFields, summaryClosed, print, createdBy } = props;
  return (
    <Dialog
      open={open}
      primaryClicked={print}
      primaryText='Print'
      secondaryText='Cancel'
      secondaryClicked={summaryClosed}
      cancelled={summaryClosed}
      title='Transaction Summary'>
      <Paper component='div' className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(transactionFields).map(id => {
              const field = transactionFields[id];
              const placeholder = field.name;
              return (
                <TableRow key={id}>
                  <TableCell>{placeholder}:</TableCell>
                  <TableCell>{field.value}</TableCell>
                </TableRow>
              );
            })}
            <TableRow key={createdBy}>
              <TableCell>Created By:</TableCell>
              <TableCell>{createdBy}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      {/* <div className={classes.container}>
        <FormGroup className={classes.content}>
          {Object.keys(transactionFields).map(id => {
            const field = transactionFields[id];
            const placeholder = field.name;
            return (<FormControlLabel
              className={classes.formLabel}
              key={id}
              control={
                <Typography style={{ marginLeft: '30px' }} align='center' type="body1">
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
            label={`CreatedBy :       `}
          />
        </FormGroup>
      </div> */}
      {/* <div className={classes.buttonsContainer}>
        <Button raised className={classes.button} color='primary' onClick={print}> Print </Button>
        <Button raised className={classes.button} color='secondary' onClick={summaryClosed}> Cancel </Button>
      </div> */}
    </Dialog>
  )
};

export default withStyles(styles)(transactionSummary);