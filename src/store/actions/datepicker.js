import {
    ON_DAY_CHANGED,
    ON_DATE_CHANGED,
    ON_DATEPICKER_RESET,
    ON_DAY_SLCTN_OPEN,
    ON_DAY_SLCTN_CLOSE,
    ON_FILTER_APPLIED,
    ON_RANGE_PICKER_CLOSE,
    ON_RANGE_PICKER_OPEN,
    ON_SINGLE_MULTI_DATE_CHANGED,
    SET_CALENDAR_OPTIONS
} from './actionTypes';
export const onDayChanged = (selectedDays = []) => ({ type: ON_DAY_CHANGED, payload: { selectedDays } });
export const onDateChanged = (selectedDates = []) => ({
    type: ON_DATE_CHANGED, payload: { selectedDates }
});
export const onDaySlctnOpen = () => ({ type: ON_DAY_SLCTN_OPEN });
export const onDaySlctnClose = () => ({ type: ON_DAY_SLCTN_CLOSE });
export const onDatepickerReset = defaultDates => ({ type: ON_DATEPICKER_RESET, payload: { defaultDates } });
export const onFilterApplied = () => ({ type: ON_FILTER_APPLIED });
export const onRangePickerClose = () => ({ type: ON_RANGE_PICKER_CLOSE });
export const onRangePickerOpen = () => ({ type: ON_RANGE_PICKER_OPEN });
export const onSingleMultiDateChanged = selectedDates => ({
    type: ON_SINGLE_MULTI_DATE_CHANGED,
    payload: { selectedDates }
});
export const setCalendarOptions = calendarOptions => ({ type: SET_CALENDAR_OPTIONS, payload: { calendarOptions } });