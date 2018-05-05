import React from 'react';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import { Typography } from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import CancelIcon from 'material-ui-icons/Cancel';
import SaveIcon from 'material-ui-icons/Save';

const CommandButton = ({ id, color, collection}) => {
    let Icon;
    let title='';
    switch (id) {
        case 'add':
            title = "Create new row";
            Icon = (<React.Fragment>
                <AddIcon />
                <Typography variant="body2" style={{ marginLeft: 10 }}>
                    Add a new {collection.slice(0, collection.length - 1)}
                </Typography>
            </React.Fragment>);
            break;
        case 'edit':
            title = "Edit row";
            Icon = <EditIcon />
            break;
        case 'delete':
            title = "Delete row";
            Icon = <SaveIcon />
            break;
        default:
        case 'cancel':
            title = "Cancel changes";
            Icon = <CancelIcon />
            break;
    }
    const GenericButton = (props)=> 
    (<IconButton {...props} title={title}>
        {props.children}
    </IconButton>);
    return (<GenericButton id={id} color={color}>
        <Icon/>
    </GenericButton>);
}
const Command = ({ id, onExecute, collection }) => {
    return (
      <CommandButton onExecute={onExecute} collection={collection} id={id}/>
    );
};
export default Command;
