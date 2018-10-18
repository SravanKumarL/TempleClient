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
    parseDateObject,
} from '../../../shared/utility';
// import RangeDatePicker from './RangeDatePicker';
import { /* SingleDatePicker, */ MultiDatePicker } from './SingleMultiDatePicker';
import DaysSelect from './DaysSelect';
import { connect } from 'react-redux';
import {
    onDatepickerReset,
    setCalendarOptions,
    onSingleMultiDateChanged,
    onDateChanged
} from '../../../../store/actions/datepicker';
import SingleDatePicker from './native/singleDatePicker';
import RangePicker from './native/rangePicker';
import {
    onNativeChangeLifted,
    nativeSetDefaultDate,
    nativeSoftResetDatePicker,
    nativeHardResetDatePicker
} from '../../../../store/actions/nativeDatePicker';
const { RANGE, SINGLE, MULTIPLE } = CALENDER_MODE;

class DatePickerWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.initialValue = [new Date()];
        this.dateSlctnChngdHandler = this.dateSlctnChngdHandler.bind(this);
        if (props.value) {
            this.initialValue = parseDateObject(props.value) || this.initialValue; //Convert into date object
        }
        this.defaultState = {
            mode: SINGLE,
        }
        this.state = { ...this.defaultState };
    }
    onResetDate = () => {
        const { onDateSelectionChanged } = this.props;
        if (onDateSelectionChanged) {
            onDateSelectionChanged([getCurrentDate()], getDaysOfWeek(), this.defaultState.mode);
        }
    }
    modeSlctnChngdHandler = (selectedMode) => {
        this.setState({ ...this.defaultState, mode: selectedMode });
        this.props.onDatepickerReset(this.initialValue);
        this.props.nativeSoftResetDatePicker();
        this.props.setCalendarOptions(this.defaultCalendarOptions);
    }
    dateSlctnChngdHandler = () => {
        const { onDateSelectionChanged, filteredDates, nativeFilteredDates } = this.props;
        const resFilteredDates = this.state.mode === MULTIPLE ? filteredDates : nativeFilteredDates;
        if (onDateSelectionChanged) {
            onDateSelectionChanged(resFilteredDates.map(date => getCurrentDate(date)), this.props.selectedDays,
                this.state.mode);
            this.props.onNativeChangeLifted();
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
        this.props.nativeSetDefaultDate(['from', 'to', 'singleDate']
            .reduce((acc, id) => ({ ...acc, [id]: this.initialValue[0] }), {}));
    }
    componentWillUnmount() {
        this.props.nativeHardResetDatePicker();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.reset !== nextProps.reset) {
            this.onResetDate();
            return true;
        }
        return this.state.mode !== nextState.mode || this.props.nativeChanged !== nextProps.nativeChanged;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.hardReset !== this.props.hardReset) {
            this.setState(this.defaultState);
        }
        else if (this.props.nativeChanged) {
            this.dateSlctnChngdHandler();
        }
    }
    render() {
        const { mode } = this.state;
        const { reset/* , addFallBack */ } = this.props;
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
                    {mode === RANGE ? <RangePicker />
                        : (mode === SINGLE ? <SingleDatePicker />
                            : <MultiDatePicker {...commonProps} key={reset} />)}


                    {/* {mode === RANGE ? <RangeDatePicker {...commonProps} key={reset} addFallBack={addFallBack} /> :
                        (mode === SINGLE ? <SingleDatePicker {...commonProps} key={reset} /> :
                            <MultiDatePicker {...commonProps} key={reset} />)} */}
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
    hardReset: state.datePicker.hardReset,
    nativeFilteredDates: state.nativeDatePicker.filteredDates,
    nativeChanged: state.nativeDatePicker.changed
});
export default connect(mapStateToProps, {
    onDatepickerReset, setCalendarOptions,
    onSingleMultiDateChanged, onDateChanged,
    onNativeChangeLifted, nativeSetDefaultDate,
    nativeSoftResetDatePicker, nativeHardResetDatePicker
})(DatePickerWrapper);