import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    display: 'flex',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    flexGrow: 1,
    // marginBottom: '50px',
  },
  table: {
    width: 400,
  },
});

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }

// const data = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

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
            {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell numeric>Calories</TableCell>
            <TableCell numeric>Fat (g)</TableCell>
            <TableCell numeric>Carbs (g)</TableCell>
            <TableCell numeric>Protein (g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? rows.map(row => {
            return (
              <TableRow key={row._id}>
                {columns.map((column, index) => (
                  <TableCell key={`${column.id} _ ${index}`}> {row[`${column.id}`]}</TableCell>
                ))}
                {/* <TableCell>{row.name}</TableCell>
                <TableCell numeric>{row.calories}</TableCell>
                <TableCell numeric>{row.fat}</TableCell>
                <TableCell numeric>{row.carbs}</TableCell>
                <TableCell numeric>{row.protein}</TableCell> */}
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