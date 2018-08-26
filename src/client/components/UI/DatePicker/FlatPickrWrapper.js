import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/material_blue.css'
import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonsGroup from '../RadioGroup/RadioGroup';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
import { getDefaultCalendarOptions } from '../../../shared/utility';
import RangeDatePicker from './RangeDatePicker';
import { SingleDatePicker, MultiDatePicker } from './SingleMultiDatePicker';
import DaysSelect from './DaysSelect';
import { connect } from 'react-redux';
import { onDatepickerReset } from '../../../../store/actions/datepicker';
import isEqual from 'lodash/isEqual';

const { RANGE, SINGLE, MULTIPLE } = CALENDER_MODE;
class DatePickerWrapper extends React.Component {
    ignorableElements = [];
    defaultState = {
        mode: SINGLE,
        calendarOptions: getDefaultCalendarOptions(SINGLE, this.props.minDate, this.props.maxDate,
            this.ignorableElements),
        reset: false
    }
    state = { ...this.defaultState };
    resetDate = () => this.dateSlctnChngdHandler([new Date()]);
    modeSlctnChngdHandler = (selectedMode) => {
        this.setState((prevState) => {
            return ({
                ...this.defaultState, mode: selectedMode, reset: true
            });
        }, this.resetDate);
        this.props.onDatepickerReset();
    }
    dateSlctnChngdHandler = (selectedDates) => {
        const { onDateSelectionChanged, filteredDates } = this.props;
        if (onDateSelectionChanged) {
            onDateSelectionChanged(this.state.mode === RANGE ? filteredDates : selectedDates,
                this.props.selectedDays, this.state.mode);
        }
    }
    daySelectMountHandler = () => {
        if (this.ignorableElements.length === 2) {
            this.ignorableElements.push(document.getElementById("dayMultiSelect"));
            this.setState((prevState) => ({
                calendarOptions: { ...prevState.calendarOptions, ignoredFocusElements: this.ignorableElements }
            }), () => {
                this.defaultState.calendarOptions.ignoredFocusElements = this.ignorableElements
            });
        }
    }
    clearClickedHandler = () => this.modeSlctnChngdHandler(this.state.mode);
    componentDidMount() {
        this.ignorableElements = [document.getElementById('datePickerWrap'),
        document.getElementById('selection')];
        this.setState((prevState) => ({
            calendarOptions: { ...prevState.calendarOptions, ignoredFocusElements: this.ignorableElements }
        }), () => {
            this.defaultState.calendarOptions.ignoredFocusElements = this.ignorableElements
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.value, this.props.value) && this.state.reset) {
            console.log('resetting datepicker');
            this.setState({ reset: false });
        }
    }
    render() {
        const { mode, calendarOptions, reset } = this.state;
        let commonProps = {
            onDateSelectionChanged: this.dateSlctnChngdHandler,
            onClearClicked: this.clearClickedHandler, value: this.props.value
        };
        return (
            <div>
                <div id="selection" style={{ display: 'flex' }}>
                    <RadioButtonsGroup options={[SINGLE, MULTIPLE, RANGE]} label='Calendar mode' mode={mode}
                        onModeSelect={this.modeSlctnChngdHandler} />
                    {mode === RANGE &&
                        <div id="dayMultiSelect" style={{ display: 'flex' }}>
                            <DaysSelect onDaySelectMount={this.daySelectMountHandler} />
                        </div>}
                </div>
                <div id="datePickerWrap">
                    {mode === RANGE ? <RangeDatePicker {...{ ...commonProps, calendarOptions }} key={reset} /> :
                        (mode === SINGLE ? <SingleDatePicker {...{ ...commonProps }} key={reset} /> :
                            <MultiDatePicker {...{ ...commonProps }} key={reset} />)}
                </div>
            </div>
        );
    }
}
DatePickerWrapper.propTypes = {
    onDateSelectionChanged: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
}
const mapStateToProps = (state, ownProps) => ({
    selectedDays: state.datePicker.selectedDays,
    filteredDates: state.datePicker.filteredDates,
    value: ownProps.value,
    onDateSelectionChanged: ownProps.onDateSelectionChanged,
    minDate: ownProps.minDate,
    maxDate: ownProps.maxDate
});
export default connect(mapStateToProps, { onDatepickerReset })(DatePickerWrapper);