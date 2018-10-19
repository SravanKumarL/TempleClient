import {
    ON_NATIVE_SINGLE_DATE_CHANGED,
    ON_NATIVE_RANGE_FROM_DATE_CHANGED,
    ON_NATIVE_RANGE_TO_DATE_CHANGED,
    ON_NATIVE_RANGE_NUMBEROFDAYS_DATE_CHANGED,
    ON_NATIVE_CHANGE_LIFTED,
    NATIVE_SOFT_RESET_DATE_PICKER,
    NATIVE_SET_DEFAULT_DATE,
    NATIVE_HARD_RESET_DATE_PICKER,
    ON_DAY_CHANGED
} from '../actions/actionTypes';
import { getDateDifference, getDaysOfWeek, fillRange, filterDates } from '../../client/shared/utility';
import { createSelector } from 'reselect';

const getFromDate = state => state.fromDate;
const getToDate = state => state.toDate;
const getSelectedDays = state => state.selectedDays;
const getRangeOfDates = createSelector([getFromDate, getToDate], (fromDate, toDate) => fillRange(fromDate, toDate));
const getFilteredDates = createSelector([getRangeOfDates, getSelectedDays], (rangeOfDates, selectedDays) =>
    filterDates(selectedDays, rangeOfDates));

const parseDate = (value, defaultDate) => (!value || value === '') ? defaultDate : new Date(Date.parse(value));

const onSingleDateChanged = (value, blur, defaultDate) => {
    const dateValue = (!value || value === '') ? defaultDate : new Date(Date.parse(value));
    if (blur) {
        if (getDateDifference(new Date(), dateValue) < 0) {
            return { singleDate: defaultDate, filteredDates: [defaultDate], changed: true };
        }
        return { singleDate: dateValue, filteredDates: [dateValue], changed: true };
    }
    return { singleDate: dateValue, changed: true };
}
const onFromDateChanged = (value, blur, state, defaultState) => {
    const defaultDate = defaultState.fromDate;
    const defaultNumber = defaultState.numberOfDays;
    const defaultFilteredDates = defaultState.filteredDates;
    const { toDate, selectedDays } = state;
    const fromDate = parseDate(value, defaultDate);
    const numberOfDays = getDateDifference(fromDate, toDate);
    if (numberOfDays < 0 || getDateDifference(new Date(), fromDate) < 0) {
        if (blur) {
            return { fromDate: defaultDate, numberOfDays: defaultNumber, changed: true, filteredDates: defaultFilteredDates };
        }
        return { fromDate, changed: true };
    } else {
        const filteredDates = getFilteredDates({ fromDate, toDate, selectedDays });
        return { fromDate, numberOfDays: filteredDates.length, changed: true, filteredDates };
    }
}
const onToDateChanged = (value, blur, state, defaultState) => {
    const defaultDate = defaultState.toDate;
    const defaultNumber = defaultState.numberOfDays;
    const defaultFilteredDates = defaultState.filteredDates;
    const toDate = parseDate(value, defaultDate);
    const { fromDate, selectedDays } = state;
    const numberOfDays = getDateDifference(fromDate, toDate);
    if (numberOfDays < 0 || getDateDifference(new Date(), toDate) < 0) {
        if (blur) {
            return { toDate: defaultDate, numberOfDays: defaultNumber, changed: true, filteredDates: defaultFilteredDates };
        }
        return { toDate, changed: true };
    }
    else {
        const filteredDates = getFilteredDates({ fromDate, toDate, selectedDays });
        return { toDate, numberOfDays: filteredDates.length, changed: true, filteredDates };
    }
}
const onNumberOfDaysChanged = (value, blur, state, defaultNumber) => {
    const { fromDate, selectedDays } = state;
    const numberOfDays = Number(value) || defaultNumber;
    if (!blur && (!value || value === '')) {
        return { numberOfDays: '', changed: true };
    }
    else if (numberOfDays < 1) {
        return {};
    }
    else {
        const toDate = new Date(new Date(fromDate).setDate(fromDate.getDate() + numberOfDays - 1));
        const filteredDates = getFilteredDates({ fromDate, toDate, selectedDays });
        return { numberOfDays: filteredDates.length, toDate, changed: true, filteredDates };
    }
}
const onDayChanged = (selectedDays, state) => {
    const filteredDates = getFilteredDates({ ...state, selectedDays });
    return { filteredDates, selectedDays, changed: true, numberOfDays: filteredDates.length };
}
const defaultState = {
    singleDate: new Date(), fromDate: new Date(), toDate: new Date(), numberOfDays: 1,
    changed: false, selectedDays: getDaysOfWeek(), filteredDates: [new Date()]
};
const nativeDatePicker = (state = { ...defaultState, defaultState }, action) => {
    const { value, defaultValues, blur } = action;
    switch (action.type) {
        case ON_NATIVE_SINGLE_DATE_CHANGED:
            return { ...state, ...onSingleDateChanged(value, blur, state.defaultState.singleDate) };
        case ON_NATIVE_RANGE_TO_DATE_CHANGED:
            return { ...state, ...onToDateChanged(value, blur, state, state.defaultState) };
        case ON_NATIVE_RANGE_FROM_DATE_CHANGED:
            return { ...state, ...onFromDateChanged(value, blur, state, state.defaultState) };
        case ON_NATIVE_RANGE_NUMBEROFDAYS_DATE_CHANGED:
            return { ...state, ...onNumberOfDaysChanged(value, blur, state, state.defaultState.numberOfDays) };
        case ON_DAY_CHANGED:
            const { selectedDays } = action.payload;
            return { ...state, ...onDayChanged(selectedDays || state.defaultState.selectedDays, state) };
        case ON_NATIVE_CHANGE_LIFTED:
            return { ...state, changed: false };
        case NATIVE_SET_DEFAULT_DATE:
            return { ...state, defaultState: { ...state.defaultState, ...defaultValues }, changed: true };
        case NATIVE_SOFT_RESET_DATE_PICKER:
            return { ...state.defaultState, defaultState: state.defaultState, changed: true };
        case NATIVE_HARD_RESET_DATE_PICKER:
            return { ...defaultState, defaultState, changed: true };
        default:
            return state;
    }
}
export default nativeDatePicker;