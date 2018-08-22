import { getDaysOfWeek, getCurrentDate, filterDates } from '../../client/shared/utility';
import { ON_DAY_CHANGED, ON_DATE_CHANGED } from "../actions/actionTypes";
import { createSelector } from 'reselect';
const getFilteredDatesSelector = (state, unFilteredDates) => filterDates(state.selectedDays, unFilteredDates);
const getFilteredDates = createSelector([getFilteredDatesSelector], filteredDates => filteredDates);
const datePicker = (state = { selectedDays: getDaysOfWeek, filteredDates: [getCurrentDate()] }, action) => {
    switch (action.type) {
        case ON_DAY_CHANGED:
            return { ...state, selectedDays: action.payload.selectedDays };
        case ON_DATE_CHANGED:
            return { ...state, filteredDates: getFilteredDates(state, action.payload.selectedDates) };
        default:
            return state;
    }
}
export default datePicker;