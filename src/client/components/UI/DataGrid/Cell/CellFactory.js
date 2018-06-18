import React from 'react';
import PasswordCell from './PasswordCell';
import LookupEditCell from './LookupCell';
import { ROLE, USER } from '../../../../../store/constants/auth';
import TableCell from '@material-ui/core/TableCell';
import { TableEditRow, Table } from '@devexpress/dx-react-grid-material-ui';
import Input from '@material-ui/core/Input'

export const Cell = (props) => {
    if (props.column.name === USER.PASSWORD) {
        const { tableRow, tableColumn, ...rest } = props; // Shows a warning if passed as is
        return (<TableCell>
            <Input inputProps={{ style: { width: '100%', marginLeft: '-1rem' } }} type="password" disableUnderline {...rest} />
        </TableCell>);
    }
    return <Table.Cell {...props} />;
};

export const EditCell = (props) => {
    if (props.column.name === USER.PASSWORD) {
        return <PasswordCell {...props} />
    }
    else if (props.column.name === USER.ROLE) {
        return <LookupEditCell availableColumnValues={Object.values(ROLE)} {...props} />
    }
    return <TableEditRow.Cell {...props} editingEnabled={props.column.name !== USER.USERNAME || props.tableRow.type === "added"} />;
};
