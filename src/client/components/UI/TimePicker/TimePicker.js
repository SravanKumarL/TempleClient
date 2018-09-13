import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
});

function TimePickers(props) {
    const { classes, onChange, value, label } = props;

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="time"
                label={label}
                type="time"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                value={value}
                onChange={e => onChange(e.target.value, label)}
            />
        </form>
    );
}

TimePickers.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default withStyles(styles)(TimePickers);
