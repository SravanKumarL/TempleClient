import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  table: {
    // width: 400,
  },
});

function SimpleTable(props) {
  const { classes, columns, rows } = props;
  const header = columns ? columns.map((column, index) => (
    <TableCell key={`${column.name}${index}`}> {column.name} </TableCell>
  )) : [];
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {header}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? rows.map(row => {
            return (
              <TableRow key={row._id}>
                {columns.map((column, index) => (
                  <TableCell key={`${column.id} _ ${index}`}> {row[`${column.id}`]}</TableCell>
                ))}
              </TableRow>
            );
          }) : null}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);