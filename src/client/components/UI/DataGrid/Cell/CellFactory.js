import React from 'react';
import PasswordCell from './PasswordCell';
import LookupEditCell from './LookupCell';
import TableCell from '@material-ui/core/TableCell';
import { TableEditRow, Table } from '@devexpress/dx-react-grid-material-ui';
import Input from '@material-ui/core/Input'

export const EnumUser = {
    role: 'role',
    password: 'password',
    username: 'username'
}
export const EnumAvailableRoles = {
    user: 'user',
    admin: 'admin'
}
export const Cell = (props) => {
    if (props.column.name === "password") {
        const { tableRow, tableColumn, ...rest } = props; // Shows a warning if passed as is
        return (<TableCell>
            <Input type="password" disabled disableUnderline {...rest} />
        </TableCell>);
    }
    return <Table.Cell {...props} />;
};

export const EditCell = (props) => {
    // const availableColumnValues = availableValues[props.column.name];
    // if (availableColumnValues) {
    //   return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
    // }
    if (props.column.name === EnumUser.password) {
        // props = { ...props, value: '' };
        return <PasswordCell {...props} />
    }
    else if (props.column.name === EnumUser.role) {
        return <LookupEditCell availableColumnValues={Object.values(EnumAvailableRoles)} {...props} />
    }
    return <TableEditRow.Cell {...props} editingEnabled={props.column.name !== EnumUser.username || props.tableRow.type === "added"} />;
};

// const groupCell = (props) => {
//   // return <TableGroupRow.Cell {...props} onToggle={onGroupToggle}/>;
//   return <TableGroupRow.Cell {...props} key={props.row.key} />
// }