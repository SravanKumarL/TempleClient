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
    }
    clearClickedHandler = () => {
        this.props.onDatepickerReset();
        const { onClearClicked } = this.props;
        if (onClearClicked) {
            onClearClicked();
        }
    };
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
            ...calendarOptions, mode: RANGE, closeOnSelect: false, defaultDate: unfilteredRange
        };
        const multiCalendarOptions = {
            ...calendarOptions, mode: MULTIPLE,
            disable: this.disableHandler, closeOnSelect: false
        };
        filteredDates = this.skipping > 0 ? filteredDates.reverse() : filteredDates;
        return (
            mode === RANGE ? <Flatpickr options={rangeCalendarOptions} key={reset}
                onChange={this.dateSlctnChngdHandler} onClearClicked={this.clearClickedHandler}
                onOpen={onRangePickerOpen} />
                : <Flatpickr options={multiCalendarOptions} key={reset} value={filteredDates}
                    onClearClicked={this.clearClickedHandler} onClose={onRangePickerClose} />
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    selectedDays: state.datePicker.selectedDays,
    reset: state.datePicker.reset,
    isDayFilterApplied: state.datePicker.isDayFilterApplied,
    unfilteredRange: state.datePicker.unfilteredRange,
    filtered: state.datePicker.filtered,
    filteredDates: state.datePicker.filteredDates,
    mode: state.datePicker.mode,
    onDateSelectionChanged: ownProps.onDateSelectionChanged,
    value: ownProps.value,
    onClearClicked: ownProps.onClearClicked,
});
export default connect(mapStateToProps, {
    onDateChanged, onDatepickerReset,
    onFilterApplied, onRangePickerClose, onRangePickerOpen
})(RangeDatePicker);
