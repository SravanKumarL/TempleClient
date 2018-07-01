import React from 'react';
import { OPERATIONS, TABLE } from '../../../../store/constants/components/datagrid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';

export const Command = ({ id, collection, onExecute }) => {
    const classes = {
        button: {
            margin: 8,
        },
        leftIcon: {
            marginRight: 8,
        },
        rightIcon: {
            marginLeft: 8,
        },
        iconSmall: {
            fontSize: 18,
        },
    };
    const { ADD, EDIT, DELETE, CANCEL, COMMIT } = OPERATIONS;
    const { EDIT_ROW, DELETE_ROW, SAVE_CHANGES, CREATE_ROW, CANCEL_CHANGES } = TABLE;
    let Icon;
    let color = 'default';
    let title = '';
    switch (id) {
        case ADD:
            return (<div>
                <Button variant="raised" size="small" style={{ background: 'seagreen', color: 'white' }} title={CREATE_ROW} className={classes.button} onClick={onExecute}>
                    <AddIcon style={{ color: 'white' }} className={classNames(classes.leftIcon, classes.iconSmall)} />
                    New {collection.slice(0, collection.length - 1)}
                </Button>
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