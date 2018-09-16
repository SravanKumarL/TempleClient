import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/material_blue.css'
import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonsGroup from '../RadioGroup/RadioGroup';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
import {
    getDefaultCalendarOptions,
    getCurrentDate,
    pushIgnoredFocusElements,
    getDaysOfWeek,
    parseDateObject
} from '../../../shared/utility';
import RangeDatePicker from './RangeDatePicker';
import { SingleDatePicker, MultiDatePicker } from './SingleMultiDatePicker';
import DaysSelect from './DaysSelect';
import { connect } from 'react-redux';
import {
    onDatepickerReset,
    setCalendarOptions,
} from '../../../../store/actions/datepicker';

const { RANGE, SINGLE, MULTIPLE } = CALENDER_MODE;
class DatePickerWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.initialValue = [new Date()];
        if (props.value) {
            this.initialValue = parseDateObject(props.value) || this.initialValue; //Convert into date object
        }
    }
    defaultState = {
        mode: SINGLE,
    }
    state = { ...this.defaultState };
    onResetDate = () => {
        const { onDateSelectionChanged } = this.props;
        if (onDateSelectionChanged) {
            onDateSelectionChanged([getCurrentDate()], getDaysOfWeek(), this.defaultState.mode);
        }
    }
    modeSlctnChngdHandler = (selectedMode) => {
        this.setState({ mode: selectedMode });
        this.props.onDatepickerReset(this.initialValue);
        this.props.setCalendarOptions(this.defaultCalendarOptions);
    }
    dateSlctnChngdHandler = () => {
        const { onDateSelectionChanged, filteredDates } = this.props;
        if (onDateSelectionChanged) {
            onDateSelectionChanged(filteredDates.map(date => getCurrentDate(date)), this.props.selectedDays,
                this.state.mode);
        }
    }
    clearClickedHandler = () => this.modeSlctnChngdHandler(this.state.mode);
    componentDidMount() {
        const calendarOptions = getDefaultCalendarOptions(SINGLE, this.props.value, this.props.minDate,
            this.props.maxDate);
        this.defaultCalendarOptions = pushIgnoredFocusElements(calendarOptions,
            [document.getElementById('datePickerWrap'), document.getElementById('selection')]);
        this.props.onDatepickerReset(this.initialValue);
        this.props.setCalendarOptions(this.defaultCalendarOptions);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.reset !== nextProps.reset) {
            this.onResetDate();
            return true;
        }
        return this.state.mode !== nextState.mode;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.hardReset !== this.props.hardReset) {
            this.setState(this.defaultState);
        }
    }
    render() {
        const { mode } = this.state;
        const { reset, addFallBack } = this.props;
        let commonProps = {
            onDateSelectionChanged: this.dateSlctnChngdHandler,
            onClearClicked: this.clearClickedHandler
        };
        return (
            <div>
                <div id="selection" style={{ display: 'flex' }}>
                    <RadioButtonsGroup options={[SINGLE, MULTIPLE, RANGE]} label='Calendar mode' mode={mode}
                        onModeSelect={this.modeSlctnChngdHandler} />
                    {mode === RANGE &&
                        <div id="dayMultiSelect" style={{ display: 'flex' }}>
                            <DaysSelect />
                        </div>}
                </div>
                <div id="datePickerWrap">
                    {mode === RANGE ? <RangeDatePicker {...commonProps} key={reset} addFallBack={addFallBack} /> :
                        (mode === SINGLE ? <SingleDatePicker {...commonProps} key={reset} /> :
                            <MultiDatePicker {...commonProps} key={reset} />)}
                </div>
            </div>
        );
    }
}
DatePickerWrapper.propTypes = {
    onDateSelectionChanged: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    selectedDays: state.datePicker.selectedDays,
    filteredDates: state.datePicker.filteredDates,
    calendarOptions: state.datePicker.calendarOptions,
    reset: state.datePicker.reset,
    hardReset: state.datePicker.hardReset
});
export default connect(mapStateToProps, { onDatepickerReset, setCalendarOptions })(DatePickerWrapper);