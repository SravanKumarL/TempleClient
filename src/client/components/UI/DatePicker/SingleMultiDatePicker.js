import React from 'react';
import Flatpickr from './Flatpickr';
import PropTypes from 'prop-types';
import { getCurrentDate, getDefaultCalendarOptions } from '../../../shared/utility';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
const { SINGLE } = CALENDER_MODE;
const disableHandler = selectedDates => [date => {
    if (selectedDates.length >= 10 && selectedDates.indexOf(getCurrentDate(date)) === -1) {
        return true;
    }
    return false;
}];
class SingleMultiDatePicker extends React.Component {
    defaultState = {
        selectedDates: this.props.selectedDates || [getCurrentDate()],
        mode: this.props.mode || SINGLE,
    }
    state = {
        selectedDates: this.defaultState.selectedDates
    }
    dateSelectionChangedHandler = (selectedDates) => {
        selectedDates = selectedDates.map(date => getCurrentDate(date));
        this.setState({ selectedDates }, () => this.props.onDateSelectionChanged(selectedDates));
    }
    clearClickedHandler = () => {
        const selectedDates = this.defaultState.selectedDates;
        this.setState({ selectedDates }, () => this.props.onDateSelectionChanged(selectedDates));
    }
    render() {
        const { mode, ignoredFocusElements, minDate, maxDate } = this.props;
        const { selectedDates } = this.state;
        const calendarOptions = getDefaultCalendarOptions(mode, minDate, maxDate, ignoredFocusElements,
            disableHandler(selectedDates));
        return (
            <Flatpickr value={selectedDates} options={calendarOptions} onClearClicked={this.clearClickedHandler}
                onChange={this.dateSelectionChangedHandler} />
        );
    }
}
SingleMultiDatePicker.propTypes = {
    onDateSelectionChanged: PropTypes.func.isRequired,
}
export default SingleMultiDatePicker;