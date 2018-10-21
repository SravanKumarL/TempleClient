import React from 'react';
import PasswordCell from './PasswordCell';
import LookupEditCell from './LookupCell';
import { ROLE, USER } from '../../../../../store/constants/auth';
import TableCell from '@material-ui/core/TableCell';
import { TableEditRow, Table } from '@devexpress/dx-react-grid-material-ui';
import Input from '@material-ui/core/Input'
import { Time, AMOUNT } from '../../../../../store/sagas/constants';
import TimeCell from './TimeCell';
import { TextField } from '@material-ui/core';

export const Cell = (props) => {
    if (props.column.name === USER.PASSWORD) {
        const { tableRow, tableColumn, value, ...rest } = props; // Shows a warning if passed as is
        return (<TableCell>
            <Input inputProps={{ style: { width: '100%', marginLeft: '-1rem' } }}
                type="password" disableUnderline value={value.substring(0, 5)} {...rest} />
        </TableCell>);
    }
    return <Table.Cell {...props} />;
};
export const EditCell = (props) => {
    if (props.column.name === USER.PASSWORD) {
        return <PasswordCell {...props} />
    }
    else if (props.column.name === AMOUNT) {
        return (
            <TableCell>
                <TextField
                    id="Amount"
                    label="Amount"
                    onChange={e => props.onValueChange(e.target.value)}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={(props.value === '' || props.value > 0) ? props.value : '0'}
                    margin="normal"
                />
            </TableCell>
        );
    }
    else if (props.column.name === Time.TIME) {
        return <TimeCell {...props} />
    }
    else if (props.column.name === USER.ROLE) {
        return <LookupEditCell availableColumnValues={Object.values(ROLE)} {...props} />
    }
    return <TableEditRow.Cell {...props} editingEnabled={props.column.name !== USER.USERNAME || props.tableRow.type === "added"} />;
};
