import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { onNativeSingleDateChanged } from '../../../../../store/actions/nativeDatePicker';
import { toISODateFormat } from '../../../../shared/utility';

export const NativePickerTheme = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});
export const NativeDatePicker = withStyles(NativePickerTheme)(({ onChange, value,
    classes, label }) =>
    (<TextField
        label={label || "Select Date.."}
        type="date"
        value={toISODateFormat(value)}
        className={classes.textField}
        InputLabelProps={{
            shrink: true,
        }}
        onChange={onChange}
    />));
const mapStateToProps = state => ({
    value: state.nativeDatePicker.singleDate
});
const mapDispatchToProps = dispatch => ({
    onChange: event => dispatch(onNativeSingleDateChanged(event.target.value))
});
const SingleDatePicker = connect(mapStateToProps, mapDispatchToProps)(NativeDatePicker);
export default SingleDatePicker;