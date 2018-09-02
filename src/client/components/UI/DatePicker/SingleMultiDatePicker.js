import React from 'react';
import Flatpickr from './Flatpickr';
import { getCurrentDate, getDefaultCalendarOptions } from '../../../shared/utility';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
const { SINGLE, MULTIPLE } = CALENDER_MODE;
const maxMultipleDates = 10;
const getDatePicker = mode => class SingleMultiDatePicker extends React.Component {
    disableHandler = date => {
        if (this.fpInstance && this.fpInstance.selectedDates.length >= maxMultipleDates &&
            this.fpInstance.selectedDates.map(selDate => selDate.toLocaleDateString())
                .indexOf(date.toLocaleDateString()) === -1) {
            return true;
        }
        return false;
    };
    state = { reset: false };
    dateSelectionChangedHandler = selectedDates => {
        const { onDateSelectionChanged } = this.props;
        if (onDateSelectionChanged) {
            onDateSelectionChanged(selectedDates);
        }
    }
    onReady = (selectedDates, currentDateString, instance, data) => {
        this.fpInstance = instance;
    }
    dateSelectionChangedHandler = this.dateSelectionChangedHandler.bind(this);
    disableHandler = this.disableHandler.bind(this);
    onReady = this.onReady.bind(this);
    calendarOptions = {
        ...getDefaultCalendarOptions(mode, this.props.value || [getCurrentDate()],
            this.props.minDate, this.props.maxDate, this.props.ignoredFocusElements),
        disable: [this.disableHandler]
    };
    clearClickedHandler = () => {
        this.setState(prevState => ({ reset: !prevState.reset }), () => {
            const { onClearClicked } = this.props;
            if (onClearClicked) {
                onClearClicked();
            }
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.reset !== nextState.reset;
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.reset) {
            this.setState({ reset: false });
        }
    }
    render() {
        return (
            <Flatpickr options={this.calendarOptions} key={this.state.reset}
                onClearClicked={this.clearClickedHandler} onChange={this.dateSelectionChangedHandler}
                onReady={this.onReady} />
        );
    }
}
export const SingleDatePicker = getDatePicker(SINGLE);
export const MultiDatePicker = getDatePicker(MULTIPLE);
