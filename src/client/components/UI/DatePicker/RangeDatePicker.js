import React from 'react';
import Flatpickr from './Flatpickr'
import { getCurrentDate } from '../../../shared/utility';
import moment from 'moment';
import _ from 'lodash';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
import { connect } from 'react-redux';
import { onDateChanged } from '../../../../store/actions/datepicker';

const { RANGE, MULTIPLE } = CALENDER_MODE;
const isFilterApplied = selectedDays => selectedDays.length > 0 && selectedDays.length < 7;
const getRangeStartEnd = (unFilteredRange) => [unFilteredRange[0], unFilteredRange[unFilteredRange.length - 1]];

class RangeDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            selectedDates: [new Date()],
            unFilteredRange: [new Date()],
            mode: RANGE,
        }
        this.state = { ...this.defaultState, defaultState: { ...this.defaultState } };
        this.dateSlctnChngdHandler = this.dateSlctnChngdHandler.bind(this);
        this.openHandler = this.openHandler.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
    }
    disableHandler = [
        date => {
            // const { selectedDates, selectedDays, filteredRange } = this.state;
            // if (selectedDates.length >= 2 && isFilterApplied(selectedDays) &&
            //     filteredRange.indexOf(getCurrentDate(date)) === -1) {
            //     return false;
            // }
            // return true;
            return false;
        }
    ];
    dateSlctnChngdHandler = (selectedDates, currentDateString, instance, data) => {
        if (selectedDates.length === 2) {
            let dates = [];
            let i = new Date(selectedDates[0]);
            while (moment(i, "DD/MM/YYYY") <= moment(selectedDates[1], "DD/MM/YYYY")) {
                dates.push(new Date(i));
                i = new Date(i.setDate(i.getDate() + 1));
            }
            this.props.onDateChanged(dates);
            selectedDates = selectedDates.map(date => getCurrentDate(date));
            this.setState({ selectedDates, unFilteredRange: dates });
        }
        else {
            this.props.onDateChanged(selectedDates);
            let stringedDates = selectedDates.map(date => getCurrentDate(date));
            if (selectedDates.length === 0) {
                stringedDates = [getCurrentDate()];
            }
            this.setState({ selectedDates: stringedDates, unFilteredRange: stringedDates });
        }
    }
    closeHandler = (selectedDates, dateStr, flatPickr) => {
        const { unFilteredRange } = this.state;
        const { selectedDays } = this.props;
        if (isFilterApplied(selectedDays) && unFilteredRange.length > 1) {
            selectedDates = getRangeStartEnd(unFilteredRange);
            this.setState({ selectedDates, datePickerMode: RANGE });
        }
        else {
            this.setState({ selectedDates });
        }
    }
    openHandler = (selDates, dateStr, flatPickr) => {
        this.flatPickrInstance = flatPickr;
        const { selectedDays, filteredRange } = this.props;
        const { selectedDates } = this.state;
        if (isFilterApplied(selectedDays) && selectedDates.length === 2) {
            this.setState({ selectedDates: filteredRange, datePickerMode: MULTIPLE });
        }
    }
    clearClickedHandler = () => this.setState({ ...this.defaultState });
    componentDidUpdate(prevProps, prevState) {
        const { onDateSelectionChanged } = this.props;
        if (onDateSelectionChanged) {
            onDateSelectionChanged(this.props.filteredRange);
        }
    }
    render() {
        let { onClearClicked, calendarOptions } = this.props;
        const { mode, selectedDates } = this.state;
        const newCalendarOptions = {
            ..._.cloneDeep(calendarOptions), mode,
            disable: this.disableHandler, closeOnSelect: false
        };
        return (
            <Flatpickr value={selectedDates} options={newCalendarOptions} onChange={this.dateSlctnChngdHandler}
                onClearClicked={onClearClicked || this.clearClickedHandler} />
            // onClose={this.onClose} onOpen={this.onOpen} closeOnSelect={false}/>
        );
    }
}
const mapStateToProps = state => ({
    selectedDays: state.datePicker.selectedDays,
    filteredRange: state.datePicker.filteredRange
});
export default connect(mapStateToProps, { onDateChanged })(RangeDatePicker);
