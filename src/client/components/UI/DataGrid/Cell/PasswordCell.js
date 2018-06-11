import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

class PasswordCellBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    onPasswordChange = e => {
        this.setState({ value: e.target.value });
        this.props.onValueChange(e.target.value);
    };
    render() {
        return (
            <TableCell>
                <TextField type="password" autoComplete="current-password" margin="normal" value={this.state.value} onChange={this.onPasswordChange} />
            </TableCell>
            
        );
    }
}
export default PasswordCellBase;