import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

class PasswordCellBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showPassword: false
        };
    }
    handlePasswordChange = e => {
        this.setState({ value: e.target.value });
        this.props.onValueChange(e.target.value);
    };
    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    handleClickShowPassword = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    };

    render() {
        return (
            <TableCell>
                <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.value}
                    onChange={this.handlePasswordChange}
                    disableUnderline={true}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                            >
                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </TableCell>
        );
    }
}
export default PasswordCellBase;