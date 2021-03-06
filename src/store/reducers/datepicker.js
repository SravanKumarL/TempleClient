import {
    // getDaysOfWeek,
    filterDates,
    getAllDays,
    isFilterApplied,
    getDefaultCalendarOptions,
    parseDateObject,
    fillRange
} from '../../client/shared/utility';
import {
    ON_DAY_CHANGED,
    ON_DATE_CHANGED,
    ON_DATEPICKER_RESET,
    ON_DAY_SLCTN_CLOSE,
    ON_DAY_SLCTN_OPEN,
    ON_FILTER_APPLIED,
    ON_RANGE_PICKER_CLOSE,
    ON_RANGE_PICKER_OPEN,
    ON_SINGLE_MULTI_DATE_CHANGED,
    SET_CALENDAR_OPTIONS,
} from '../actions/actionTypes';
import { createSelector } from 'reselect';
import { ALL_DAYS, CALENDER_MODE } from '../constants/transactions';

const allDays = 'All Days';
const { RANGE, MULTIPLE } = CALENDER_MODE;
const getDays = state => state.selectedDays;
const getDatesInRange = state => {
    const unfilteredRange = [...state.unfilteredRange];
    if (unfilteredRange.length === 1) {
        return unfilteredRange;
    }
    return fillRange(unfilteredRange[0], unfilteredRange[1]);
}
const getRangeOfDates = createSelector(getDatesInRange, rangeOfDates => rangeOfDates);
const getSelectedDays = createSelector(getDays, days => days);
const getFilteredDates = createSelector(getSelectedDays, getRangeOfDates,
    (selectedDays, rangeOfDates) => filterDates(selectedDays, rangeOfDates));

const defaultState = {
    selectedDays: /* getDaysOfWeek() */[allDays], filteredDates: [new Date()], filtered: false,
    isDayFilterApplied: false, mode: RANGE, unfilteredRange: [new Date()], reset: false,
    calendarOptions: getDefaultCalendarOptions(RANGE), hardReset: false,
    rangePickerReset: false
};
const datePicker = (state = defaultState, action) => {
    switch (action.type) {
        case ON_DAY_SLCTN_CLOSE:
            return {
                ...state, selectedDays: (state.selectedDays.length === 0 || state.selectedDays.length >= 7)
                    ? [allDays] : state.selectedDays.filter(day => day !== ALL_DAYS)
            };
        case ON_DAY_SLCTN_OPEN:
            if (state.selectedDays.length === 7 || state.selectedDays.length === 0 || state.selectedDays[0] === allDays) {
                return { ...state, selectedDays: getAllDays() };
            }
            return state;
        case ON_RANGE_PICKER_CLOSE:
            return { ...state, mode: RANGE, rangePickerReset: !state.rangePickerReset };
        case ON_RANGE_PICKER_OPEN:
            return { ...state, mode: (state.isDayFilterApplied && state.filteredDates.length > 1) ? MULTIPLE : RANGE }
        case ON_DAY_CHANGED:
            const { selectedDays } = action.payload;
            let filteredDates = getFilteredDates({ ...state, selectedDays })
            return {
                ...state, selectedDays, filtered: true,
                isDayFilterApplied: isFilterApplied(selectedDays),
                filteredDates
            };
        case ON_DATE_CHANGED:
            const unfilteredRange = action.payload.selectedDates;
            filteredDates = getFilteredDates({ ...state, unfilteredRange });
            return {
                ...state, filteredDates, filtered: true, unfilteredRange,
                mode: (state.isDayFilterApplied && filteredDates.length > 1) ? MULTIPLE : RANGE
            };
        case ON_SINGLE_MULTI_DATE_CHANGED:
            return { ...state, filteredDates: action.payload.selectedDates || state.filteredDates };
        case ON_FILTER_APPLIED:
            return { ...state, filtered: false };
        case SET_CALENDAR_OPTIONS:
            const newState = {
                ...state, calendarOptions: {
                    ...state.calendarOptions,
                    ...(action.payload.calendarOptions || {})
                }
            };
            return newState;
        case ON_DATEPICKER_RESET:
            const payloadDates = action.payload.defaultDates;
            const defaultFilteredDates = parseDateObject((payloadDates && payloadDates.length > 0) ? payloadDates
                : defaultState.filteredDates);
            const defaultUnFilteredDates = parseDateObject((payloadDates && payloadDates.length > 0) ? payloadDates
                : defaultState.unfilteredRange);
            return {
                ...defaultState, reset: !state.reset,
                hardReset: action.payload.hardReset ? !state.hardReset : state.hardReset,
                filteredDates: defaultFilteredDates, unfilteredRange: defaultUnFilteredDates
            };
        default:
            return state;
    }
}
export default datePicker;