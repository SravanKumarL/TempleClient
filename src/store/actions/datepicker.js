import { ON_DAY_CHANGED, ON_DATE_CHANGED } from "./actionTypes";

export const onDayChanged = (selectedDays = []) => ({ type: ON_DAY_CHANGED, payload: { selectedDays } });
export const onDateChanged = (selectedDates = []) => ({ type: ON_DATE_CHANGED, payload: { selectedDates } });
