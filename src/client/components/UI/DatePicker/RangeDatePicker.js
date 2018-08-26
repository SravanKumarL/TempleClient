import React from 'react';
import Flatpickr from './Flatpickr'
import { getCurrentDate } from '../../../shared/utility';
import moment from 'moment';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
import { connect } from 'react-redux';
import {
    onDateChanged,
    onFilterApplied,
    onRangePickerClose,
    onRangePickerOpen
} from '../../../../store/actions/datepicker';
const { RANGE, MULTIPLE } = CALENDER_MODE;
const getRange = (dates) => dates.length === 1 ? dates : [dates[0], dates[dates.length - 1]];
class RangeDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            reset: false
        }
        this.state = { ...this.defaultState };
        this.dateSlctnChngdHandler = this.dateSlctnChngdHandler.bind(this);
        // this.openHandler = this.openHandler.bind(this);
        // this.closeHandler = this.closeHandler.bind(this);
    }
    unFilteredRange = [new Date()];
    disableHandler = [
        date => this.props.filteredDates.map(fdate => getCurrentDate(fdate)).indexOf(getCurrentDate(date)) === -1
    ];
    dateSlctnChngdHandler = (selectedDates, currentDateString, instance, data) => {
        this.unFilteredRange = selectedDates;
        if (selectedDates.length === 2) {
            let dates = [];
            let i = new Date(selectedDates[0]);
            while (moment(i, "DD/MM/YYYY") <= moment(selectedDates[1], "DD/MM/YYYY")) {
                dates.push(new Date(i));
                i = new Date(i.setDate(i.getDate() + 1));
            }
            this.props.onDateChanged(dates);
        }
        else {
            this.props.onDateChanged(selectedDates);
            let stringedDates = selectedDates.map(date => getCurrentDate(date));
            if (selectedDates.length === 0) {
                console.log('Inconsistency in datepicker occured');
                stringedDates = [getCurrentDate()];
            }
            // this.setState({ selectedDates: stringedDates, unFilteredRange: stringedDates });
        }
    }
    clearClickedHandler = () => this.setState({ ...this.defaultState, reset: true },
        () => {
            this.props.onDateChanged(this.defaultState.selectedDates);
            const { onClearClicked } = this.props;
            if (onClearClicked) {
                onClearClicked();
            }
        });
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.filtered) {
            nextProps.onDateSelectionChanged();
            nextProps.onFilterApplied();
        }
        return nextState.reset !== this.state.reset || nextProps.mode !== this.props.mode;
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.reset) {
            this.setState({ reset: false });
        }
    }
    render() {
        let { calendarOptions, filteredDates, mode, onRangePickerClose, onRangePickerOpen } = this.props;
        const { reset } = this.state;
        const rangeCalendarOptions = {
            ...calendarOptions, mode: RANGE, closeOnSelect: false, defaultDate: this.unFilteredRange
        };
        const multiCalendarOptions = {
            ...calendarOptions, mode: MULTIPLE,
            disable: this.disableHandler, closeOnSelect: false
        };
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
    isDayFilterApplied: state.datePicker.isDayFilterApplied,
    filtered: state.datePicker.filtered,
    filteredDates: state.datePicker.filteredDates,
    mode: state.datePicker.mode,
    onDateSelectionChanged: ownProps.onDateSelectionChanged,
    value: ownProps.value,
    onClearClicked: ownProps.onClearClicked,
});
export default connect(mapStateToProps, {
    onDateChanged,
    onFilterApplied, onRangePickerClose, onRangePickerOpen
})(RangeDatePicker);
