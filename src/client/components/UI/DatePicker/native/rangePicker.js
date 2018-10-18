import React from 'react';
import { NativeDatePicker, NativePickerTheme } from './singleDatePicker';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
    onNativeRangeFromDateChanged,
    onNativeRangeToDateChanged,
    onNativeRangeNumberOfDaysChanged
} from '../../../../../store/actions/nativeDatePicker';
import TextField from '@material-ui/core/TextField';
export const NativeRangePicker = withStyles(NativePickerTheme)(({ onNativeRangeFromDateChanged,
    onNativeRangeToDateChanged,
    onNativeRangeNumberOfDaysChanged, classes,
    toDate, fromDate, numberOfDays }) => (
        <div style={{ display: 'flex', flexDirection: "row", flexGrow: 1 }}>
            <NativeDatePicker onChange={e => onNativeRangeFromDateChanged(e.target.value)} label='From' value={fromDate} />
            <NativeDatePicker onChange={e => onNativeRangeToDateChanged(e.target.value)} label='To' value={toDate} />
            <TextField label='Number of Days' value={numberOfDays} className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }} type='number' onChange={e => onNativeRangeNumberOfDaysChanged(e.target.value)} />
        </div>
    ));
const mapStateToProps = state => ({
    fromDate: state.nativeDatePicker.fromDate,
    toDate: state.nativeDatePicker.toDate,
    numberOfDays: state.nativeDatePicker.numberOfDays
});
const RangePicker = connect(mapStateToProps, {
    onNativeRangeFromDateChanged,
    onNativeRangeToDateChanged,
    onNativeRangeNumberOfDaysChanged
})(NativeRangePicker);
export default RangePicker;