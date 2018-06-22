import React from 'react';
import { OPERATIONS, TABLE } from '../../../../store/constants/components/datagrid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

export const Command = ({ id, collection, onExecute }) => {
    const { ADD, EDIT, DELETE, CANCEL, COMMIT } = OPERATIONS;
    const { EDIT_ROW, DELETE_ROW, SAVE_CHANGES, CREATE_ROW, CANCEL_CHANGES } = TABLE;
    let Icon;
    let color = 'default';
    let title = '';
    switch (id) {
        case ADD:
            return (<div style={{ width: 120 }}>
                <IconButton title={CREATE_ROW} onClick={onExecute}>
                    <AddIcon />
                    <Typography variant="body2" style={{ fontWeight: 500, fontSize: '1rem', marginLeft: 10 }}>
                        Add a new {collection.slice(0, collection.length - 1)}
                    </Typography>
                </IconButton>
            </div>);
        case EDIT:
            title = EDIT_ROW;
            Icon = EditIcon;
            break;
        case DELETE:
            title = DELETE_ROW;
            Icon = DeleteIcon;
            break;
        case COMMIT:
            title = SAVE_CHANGES;
            Icon = SaveIcon;
            break;
        case CANCEL:
        default:
            title = CANCEL_CHANGES;
            color = 'secondary';
            Icon = CancelIcon;
            break;
    }
    return (<IconButton title={title} color={color} onClick={onExecute}>
        <Icon />
    </IconButton>);
}