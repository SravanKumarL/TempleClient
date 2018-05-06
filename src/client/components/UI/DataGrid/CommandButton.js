import React from 'react';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import CancelIcon from 'material-ui-icons/Cancel';
import SaveIcon from 'material-ui-icons/Save';

export const Command = ({ id, collection, onExecute }) => {
    let Icon;
    let color = 'primary';
    let title = '';
    switch (id) {
        case 'add':
            return (<div style={{ width: 120 }}>
                <IconButton title="Create new row" onClick={onExecute}>
                    <AddIcon />
                    <Typography variant="body2" style={{ marginLeft: 10 }}>
                        Add a new {collection.slice(0, collection.length - 1)}
                    </Typography>
                </IconButton>
            </div>);
        case 'edit':
            title = "Edit row";
            Icon = EditIcon;
            break;
        case 'delete':
            title = "Delete row";
            Icon = DeleteIcon;
            break;
        case 'commit':
            title = "Save changes";
            Icon = SaveIcon;
            break;
        case 'cancel':
        default:
            title = "Cancel changes";
            color = 'secondary';
            Icon = CancelIcon;
            break;
    }
    return (<IconButton title={title} color={color} onClick={onExecute}>
        <Icon />
    </IconButton>);
}