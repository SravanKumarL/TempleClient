import React from 'react';
import { withStyles } from 'material-ui/styles';
import { TableCell, Input, Select, MenuItem } from 'material-ui';
const styles = {

};
const onLookupSelected = (onValueChange) => ((event) => {
    onValueChange(event.target.value);
});
const LookupEditCellBase = ({
    availableColumnValues, value, onValueChange, classes,
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