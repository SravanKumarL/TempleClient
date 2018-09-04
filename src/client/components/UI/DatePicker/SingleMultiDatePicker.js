import React from 'react';
import Flatpickr from './Flatpickr';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
import { connect } from 'react-redux';
import {
    onDatepickerReset,
    onSingleMultiDateChanged
} from '../../../../store/actions/datepicker';
import { getCurrentDate } from '../../../shared/utility';
const { SINGLE, MULTIPLE } = CALENDER_MODE;
const maxMultipleDates = 10;
class SingleMultiDatePicker extends React.Component {
    disableHandler = date => {
        if (this.fpInstance && this.fpInstance.selectedDates.length >= maxMultipleDates &&
            this.fpInstance.selectedDates.map(selDate => selDate.toLocaleDateString())
                .indexOf(date.toLocaleDateString()) === -1) {
            return true;
        }
        return false;
    };
    onReady = (selectedDates, currentDateString, instance, data) => {
        this.fpInstance = instance;
    }
    disableHandler = this.disableHandler.bind(this);
    onReady = this.onReady.bind(this);
    calendarOptions = { ...this.props.calendarOptions, disable: [this.disableHandler], mode: this.props.mode };
    dateSelectionChangedHandler = selectedDates => {
        this.props.onSingleMultiDateChanged(selectedDates);
        const { onDateSelectionChanged } = this.props;
        if (onDateSelectionChanged) {
            onDateSelectionChanged();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.reset !== nextProps.reset;
    }
    render() {
        return (
            <Flatpickr options={this.calendarOptions} key={this.props.reset}
                onClearClicked={this.props.onClearClicked} onChange={this.dateSelectionChangedHandler}
                onReady={this.onReady} value={this.props.filteredDates.map(date => getCurrentDate(date))} />
        );
    }
}
const mapStateToProps = state => ({
    filteredDates: state.datePicker.filteredDates,
    calendarOptions: state.datePicker.calendarOptions,
    reset: state.datePicker.reset
});
const SingleMultiDatePickerWrapper = connect(mapStateToProps,
    { onSingleMultiDateChanged, onDatepickerReset })(SingleMultiDatePicker);
const getDatePicker = mode => props => <SingleMultiDatePickerWrapper mode={mode} {...props} />
export const SingleDatePicker = getDatePicker(SINGLE);
export const MultiDatePicker = getDatePicker(MULTIPLE);
