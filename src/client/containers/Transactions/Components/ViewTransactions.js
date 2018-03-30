import React from 'react';

import withStyles from 'material-ui/styles/withStyles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { convertToStartCase } from '../../../shared/utility';
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
const transactionSummary = (props) => {
  const { classes, transaction } = props;
  return (
    <Paper component='div' className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(transaction).map(id => {
            if (id === '_id' || id === '__v') {
              return null;
            }
            const value = transaction[id];
            const placeholder = convertToStartCase(id);
            return (
              <TableRow key={id}>
                <TableCell>{placeholder}:</TableCell>
                <TableCell style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  )
};

export default withStyles(styles)(transactionSummary);