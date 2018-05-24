import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '../../components/UI/Dialog/Dialog';

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
  return dates.join(',');
}

const transactionSummary = ({ classes, open, transactionFields, summaryClosed, print, createdBy }) => {
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
              if (id === 'others') {
                return null;
              }
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