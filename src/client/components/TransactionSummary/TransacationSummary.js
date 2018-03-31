import React from 'react';

import withStyles from 'material-ui/styles/withStyles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Dialog from '../../components/UI/Dialog/Dialog';
// import { getCurrentDate } from '../../shared/utility';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  table: {
    minWidth: 400,
  },
});
const getDates = (dates) => {
  // const newDates = dates.map(date => getCurrentDate(date));
  return dates.join(',');
}
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
                  <TableCell style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{id === 'selectedDates' ? getDates(field.value) : field.value}</TableCell>
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
    </Dialog>
  )
};

export default withStyles(styles)(transactionSummary);