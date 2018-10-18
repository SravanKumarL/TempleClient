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

const onSingleDateChanged = (value, defaultDate) => {
    const dateValue = (!value || value === '') ? defaultDate : new Date(Date.parse(value));
    if (getDateDifference(new Date(), dateValue) >= 0) {
        return { singleDate: dateValue, changed: true };
    }
    return {};
}
const onFromDateChanged = (value, state, defaultDate) => {
    const { toDate, selectedDays } = state;
    const fromDate = parseDate(value, defaultDate);
    const numberOfDays = getDateDifference(fromDate, toDate);
    if (numberOfDays < 0 || getDateDifference(new Date(), fromDate) < 0) {
        return {};
    } else {
        const filteredDates = getFilteredDates({ fromDate, toDate, selectedDays });
        return { fromDate, numberOfDays: filteredDates.length, changed: true, filteredDates };
    }
}
const onNumberOfDaysChanged = (value, state, defaultNumber) => {
    const { fromDate, selectedDays } = state;
    const numberOfDays = Number(value) || defaultNumber;
    if (numberOfDays < 1) {
        return {};
    }
    else {
        const toDate = new Date(new Date(fromDate).setDate(fromDate.getDate() + numberOfDays - 1));
        const filteredDates = getFilteredDates({ fromDate, toDate, selectedDays });
        return { numberOfDays: filteredDates.length, toDate, changed: true, filteredDates };
    }
}
const onToDateChanged = (value, state, defaultDate) => {
    const toDate = parseDate(value, defaultDate);
    const { fromDate, selectedDays } = state;
    const numberOfDays = getDateDifference(fromDate, toDate);
    if (numberOfDays < 0 || getDateDifference(new Date(), toDate) < 0) {
        return {};
    }
    else {
        const filteredDates = getFilteredDates({ fromDate, toDate, selectedDays });
        return { toDate, numberOfDays: filteredDates.length, changed: true, filteredDates };
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
    const { value, defaultValues } = action;
    switch (action.type) {
        case ON_NATIVE_SINGLE_DATE_CHANGED:
            return { ...state, ...onSingleDateChanged(value, state.defaultState.singleDate) };
        case ON_NATIVE_RANGE_TO_DATE_CHANGED:
            return { ...state, ...onToDateChanged(value, state, state.defaultState.toDate) };
        case ON_NATIVE_RANGE_FROM_DATE_CHANGED:
            return { ...state, ...onFromDateChanged(value, state, state.defaultState.fromDate) };
        case ON_NATIVE_RANGE_NUMBEROFDAYS_DATE_CHANGED:
            return { ...state, ...onNumberOfDaysChanged(value, state, state.defaultState.numberOfDays) };
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