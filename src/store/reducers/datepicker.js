import { getDaysOfWeek, filterDates, getAllDays, isFilterApplied } from '../../client/shared/utility';
import {
    ON_DAY_CHANGED,
    ON_DATE_CHANGED,
    ON_DATEPICKER_RESET,
    ON_DAY_SLCTN_CLOSE,
    ON_DAY_SLCTN_OPEN,
    ON_FILTER_APPLIED,
    ON_RANGE_PICKER_CLOSE,
    ON_RANGE_PICKER_OPEN
} from '../actions/actionTypes';
import { createSelector } from 'reselect';
import { ALL_DAYS, CALENDER_MODE } from '../constants/transactions';
const { RANGE, MULTIPLE } = CALENDER_MODE;
const getFilteredDatesSelector = (state, unFilteredDates) => filterDates(state.selectedDays, unFilteredDates);
const getFilteredDates = createSelector([getFilteredDatesSelector], filteredDates => filteredDates);
const defaultState = {
    selectedDays: getDaysOfWeek(), filteredDates: [new Date()], filtered: false,
    isDayFilterApplied: false, mode: RANGE
};
const datePicker = (state = defaultState, action) => {
    switch (action.type) {
        case ON_DAY_SLCTN_CLOSE:
            return { ...state, selectedDays: state.selectedDays.filter(day => day !== ALL_DAYS) };
        case ON_DAY_SLCTN_OPEN:
            if (state.selectedDays.length === 7) {
                return { ...state, selectedDays: getAllDays() };
            }
            return state;
        case ON_RANGE_PICKER_CLOSE:
            return { ...state, mode: RANGE };
        case ON_RANGE_PICKER_OPEN:
            return { ...state, mode: (state.isDayFilterApplied && state.filteredDates.length > 1) ? MULTIPLE : RANGE }
        case ON_DAY_CHANGED:
            const { selectedDays } = action.payload;
            const isDayFilterApplied = isFilterApplied(selectedDays);
            let filteredDates = getFilteredDates({ selectedDays }, state.filteredDates)
            return {
                ...state, selectedDays, filtered: true,
                isDayFilterApplied, filteredDates,
                mode: (isDayFilterApplied && filteredDates.length > 1) ? MULTIPLE : RANGE,
            };
        case ON_DATE_CHANGED:
            filteredDates = getFilteredDates(state, action.payload.selectedDates);
            return {
                ...state, filteredDates, filtered: true,
                mode: (state.isDayFilterApplied && filteredDates.length > 1) ? MULTIPLE : RANGE
            };
        case ON_FILTER_APPLIED:
            return { ...state, filtered: false };
        case ON_DATEPICKER_RESET:
            return defaultState;
        default:
            return state;
    }
}
export default datePicker;