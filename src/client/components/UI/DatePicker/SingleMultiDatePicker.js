import React from 'react';
import Flatpickr from './Flatpickr';
import PropTypes from 'prop-types';
import { getCurrentDate, getDefaultCalendarOptions } from '../../../shared/utility';
import { CALENDER_MODE } from '../../../../store/constants/transactions';
const { SINGLE, MULTIPLE } = CALENDER_MODE;
const disableHandler = selectedDates => [date => {
    if (selectedDates.length >= 10 && selectedDates.indexOf(getCurrentDate(date)) === -1) {
        return true;
    }
    return false;
}];
// class SingleMultiDatePicker extends React.Component {
//     constructor(props) {
//         super(props);
//         this.defaultState = {
//             calendarOptions: getDefaultCalendarOptions(props.mode || SINGLE, props.value || [getCurrentDate()],
//                 props.minDate, props.maxDate, props.ignoredFocusElements)
//         };
//         this.setupDatePickers();
//         this.defaultState.PreferredPicker = this.SinglePicker;
//         this.state = {
//             SinglePicker: this.SinglePicker,
//             MultiPicker: this.MultiPicker,
//             prevMode: ''
//         }
//     }
//     onDatePickerReady = (dates, currentDateString, instance, data) => {
//         const mode = instance.config.mode;
//         instance.config.disable = disableHandler(instance.selectedDates);
//         this[`${mode}DatepickerInstance`] = instance;
//     }
//     getDatePicker = mode => <Flatpickr options={{ ...this.defaultState.calendarOptions, mode }}
//         onClearClicked={this.clearClickedHandler} onChange={this.dateSelectionChangedHandler}
//         onReady={this.onDatePickerReady} />;

//     setupDatePickers = () => {
//         this.SinglePicker = this.getDatePicker(SINGLE);
//         this.MultiPicker = this.getDatePicker(MULTIPLE);
//     }

//     dateSelectionChangedHandler = (selectedDates) => {
//         selectedDates = selectedDates.map(date => getCurrentDate(date));
//         this.props.onDateSelectionChanged(selectedDates);
//     }
//     clearClickedHandler = () => {
//         this.setupDatePickers();
//         this.setState(this.defaultState, () => {
//             const { onClearClicked } = this.props;
//             if (onClearClicked) {
//                 onClearClicked();
//             }
//         });
//     }
//     static getDerivedStateFromProps(props, state) {
//         if (props.mode !== state.prevMode) {
//             return {
//                 PreferredPicker: props.mode === SINGLE ? state.SinglePicker : state.MultiPicker,
//                 prevMode: props.mode
//             };
//         }
//         return null;
//     }
//     shouldComponentUpdate(nextProps, nextState) {
//         if (nextProps.mode !== this.props.mode) {
//             return true;
//         }
//         return false;
//     }
//     render() {
//         const PreferredPicker = () => this.state.PreferredPicker;
//         return (<PreferredPicker />);
//     }
// }
// SingleMultiDatePicker.propTypes = {
//     onDateSelectionChanged: PropTypes.func.isRequired,
// }
// export default SingleMultiDatePicker;
const getDatePicker = mode => class SingleMultiDatePicker extends React.Component {
    defaultState = {
        calendarOptions: getDefaultCalendarOptions(mode, this.props.value || [getCurrentDate()],
            this.props.minDate, this.props.maxDate, this.props.ignoredFocusElements),
        reset: false
    }
    state = { ...this.defaultState };
    dateSelectionChangedHandler = (selectedDates) => {
        const { onDateSelectionChanged } = this.props;
        if (onDateSelectionChanged) {
            selectedDates = selectedDates.map(date => getCurrentDate(date));
            onDateSelectionChanged(selectedDates);
        }
    }
    clearClickedHandler = () => {
        this.setState({ ...this.defaultState, reset: true }, () => {
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
            <Flatpickr options={this.state.calendarOptions} key={this.state.reset}
                onClearClicked={this.clearClickedHandler} onChange={this.dateSelectionChangedHandler} />
        );
    }
}
export const SingleDatePicker = getDatePicker(SINGLE);
export const MultiDatePicker = getDatePicker(MULTIPLE);
