import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TableCell from '@material-ui/core/TableCell';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const styles = theme => ({
    lookupEditCell: {
        paddingTop: theme.spacing.unit * 0.875,
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    },
    inputRoot: {
        width: '100%',
    },
});
const onLookupSelected = (onValueChange) => ((event) => {
    onValueChange(event.target.value);
});
const LookupEditCellBase = ({
    availableColumnValues, value, onValueChange, classes
}) => (
        <TableCell
            className={classes.lookupEditCell}
        >
            <Select
                value={value}
                onChange={onLookupSelected(onValueChange)}
                input={
                    <Input
                        classes={{ root: classes.inputRoot }}
                    />
                }
            >
                {availableColumnValues.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
            </Select>
        </TableCell>
    );
export default withStyles(styles)(LookupEditCellBase);