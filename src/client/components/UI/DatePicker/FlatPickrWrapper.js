import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/material_blue.css'
import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonsGroup from '../RadioGroup/RadioGroup';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
import { getDefaultCalendarOptions } from '../../../shared/utility';
import RangeDatePicker from './RangeDatePicker';
import SingleMultiDatePicker from './SingleMultiDatePicker';
import DaysSelect from './DaysSelect';

const { RANGE, SINGLE, MULTIPLE } = CALENDER_MODE;
class DatePickerWrapper extends React.Component {
    ignorableElements = [];
    defaultState = {
        selectedDates: this.props.value || [new Date()],
        mode: SINGLE,
        calendarOptions: getDefaultCalendarOptions(SINGLE, this.props.minDate, this.props.maxDate,
            this.ignorableElements)
    }
    state = { ...this.defaultState };
    modeSlctnChngdHandler = (selectedMode) => {
        this.setState((prevState) => {
            return ({
                ...this.defaultState, mode: selectedMode
            });
        }, () => this.dateSlctnChngdHanlder([new Date()]));
    }
    dateSlctnChngdHanlder = (selectedDates) => {
        const { onDateSelectionChanged } = this.props;
        this.setState({ selectedDates }, () => {
            if (onDateSelectionChanged) {
                onDateSelectionChanged(selectedDates, this.props.selectedDays, this.state.mode);
            }
        });
    }
    daySelectMountHandler = () => this.ignorableElements.push(document.getElementById("dayMultiSelect"));
    clearClickedHandler = () => this.setState(this.defaultState);
    componentDidMount() {
        this.ignorableElements = [document.getElementById('datePickerWrap'),
        document.getElementById('selection')];
        this.setState((prevState) => ({
            calendarOptions: { ...prevState.calendarOptions, ignoredFocusElements: this.ignorableElements }
        }), () => {
            this.defaultState.calendarOptions.ignoredFocusElements = this.ignorableElements
        });
    }
    render() {
        const { mode, calendarOptions } = this.state;
        let commonProps = {
            calendarOptions, onDateSelectionChanged: this.dateSlctnChngdHanlder,
            onClearClicked: this.clearClickedHandler
        };
        return (
            <div>
                <div id="selection" style={{ display: 'flex' }}>
                    <RadioButtonsGroup options={[SINGLE, MULTIPLE, RANGE]} label='Calendar mode' mode={mode}
                        onModeSelect={this.modeSlctnChngdHandler} />
                    {mode === RANGE && <DaysSelect onDaysSelectionChanged={this.dayChngdEvent}
                        onDaySelectMount={this.daySelectMountHandler} />}
                </div>
                <div id="datePickerWrap">
                    {mode === RANGE ? <RangeDatePicker {...{ ...commonProps }} /> :
                        <SingleMultiDatePicker {...{ ...commonProps, mode }} />}
                </div>
            </div>
        );
    }
}
DatePickerWrapper.propTypes = {
    onDateSelectionChanged: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
}
export default DatePickerWrapper;