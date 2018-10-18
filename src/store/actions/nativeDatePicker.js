import {
    ON_NATIVE_SINGLE_DATE_CHANGED,
    ON_NATIVE_RANGE_FROM_DATE_CHANGED, ON_NATIVE_RANGE_TO_DATE_CHANGED,
    ON_NATIVE_RANGE_NUMBEROFDAYS_DATE_CHANGED, ON_NATIVE_CHANGE_LIFTED, NATIVE_SET_DEFAULT_DATE, NATIVE_SOFT_RESET_DATE_PICKER, NATIVE_HARD_RESET_DATE_PICKER
} from './actionTypes';
export const onNativeSingleDateChanged = (value) => (({ type: ON_NATIVE_SINGLE_DATE_CHANGED, value }));
export const onNativeRangeFromDateChanged = (value) => ({ type: ON_NATIVE_RANGE_FROM_DATE_CHANGED, value });
export const onNativeRangeToDateChanged = (value) => ({ type: ON_NATIVE_RANGE_TO_DATE_CHANGED, value });
export const onNativeRangeNumberOfDaysChanged = (value) => ({ type: ON_NATIVE_RANGE_NUMBEROFDAYS_DATE_CHANGED, value });
export const onNativeChangeLifted = () => ({ type: ON_NATIVE_CHANGE_LIFTED });
export const nativeSetDefaultDate = (defaultValues) => ({ type: NATIVE_SET_DEFAULT_DATE, defaultValues });
export const nativeSoftResetDatePicker = () => ({ type: NATIVE_SOFT_RESET_DATE_PICKER });
export const nativeHardResetDatePicker = () => ({ type: NATIVE_HARD_RESET_DATE_PICKER });

