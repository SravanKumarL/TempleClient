import React from 'react';
import { withStyles } from 'material-ui/styles'
import { TableCell, TextField } from 'material-ui';
const styles={
    
};
class PasswordCellBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onPasswordChange = e => {
            this.setState({ value: e.target.value });
            this.props.onValueChange(e.target.value);
        };
    }
    render() {
        const { classes } = this.props;
        return (
            <TableCell>
                <TextField type="password" autoComplete="current-password" margin="normal" value={this.state.value} onChange={this.onPasswordChange} />
            </TableCell>
            //className={classes.password}
        );
    }
}
export default withStyles(styles)(PasswordCellBase);