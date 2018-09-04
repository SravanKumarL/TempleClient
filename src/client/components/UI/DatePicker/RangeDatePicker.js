import React from 'react';
import Flatpickr from './Flatpickr'
import { getCurrentDate } from '../../../shared/utility';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
import { connect } from 'react-redux';
import {
    onDateChanged,
    onFilterApplied,
    onRangePickerClose,
    onRangePickerOpen,
    onDatepickerReset
} from '../../../../store/actions/datepicker';
const { RANGE, MULTIPLE } = CALENDER_MODE;
class RangeDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.dateSlctnChngdHandler = this.dateSlctnChngdHandler.bind(this);
    }
    disableHandler = [
        date => this.props.filteredDates.map(fdate => getCurrentDate(fdate)).indexOf(getCurrentDate(date)) === -1
    ];
    dateSlctnChngdHandler = (selectedDates, currentDateString, instance, data) => {
        if (selectedDates.length === 2 && this.props.mode === RANGE) {
            this.skipping = selectedDates[1].getTime() - selectedDates[0].getTime();
            this.props.onDateChanged(selectedDates);
        }
        else if (selectedDates.length === 0) {
            this.props.onDatepickerReset([]);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.filtered) {
            nextProps.onDateSelectionChanged();
            nextProps.onFilterApplied();
        }
        return nextProps.reset !== this.props.reset || nextProps.mode !== this.props.mode;
    }
    render() {
        let { calendarOptions, filteredDates, unfilteredRange, mode, onRangePickerClose,
            onRangePickerOpen, reset } = this.props;
        const rangeCalendarOptions = {
            ...calendarOptions, mode: RANGE, closeOnSelect: false
        };
        const multiCalendarOptions = {
            ...calendarOptions, mode: MULTIPLE,
            disable: this.disableHandler, closeOnSelect: false
        };
        filteredDates = this.skipping > 0 ? filteredDates.reverse() : filteredDates;
        return (
            mode === RANGE ? <Flatpickr options={rangeCalendarOptions} key={reset}
                onChange={this.dateSlctnChngdHandler} onClearClicked={this.props.onClearClicked}
                onOpen={onRangePickerOpen} value={unfilteredRange.map(date => getCurrentDate(date))} />
                : <Flatpickr options={multiCalendarOptions} key={reset}
                    value={filteredDates.map(date => getCurrentDate(date))} onClearClicked={this.props.onClearClicked}
                    onClose={onRangePickerClose} />
        );
    }
}
const mapStateToProps = state => ({
    selectedDays: state.datePicker.selectedDays,
    calendarOptions: state.datePicker.calendarOptions,
    reset: state.datePicker.reset,
    isDayFilterApplied: state.datePicker.isDayFilterApplied,
    unfilteredRange: state.datePicker.unfilteredRange,
    filtered: state.datePicker.filtered,
    filteredDates: state.datePicker.filteredDates,
    mode: state.datePicker.mode,
});
export default connect(mapStateToProps, {
    onDateChanged, onDatepickerReset,
    onFilterApplied, onRangePickerClose, onRangePickerOpen
})(RangeDatePicker);
