import { ON_FOR_ALL_USERS_CHECKCHANGED, RESET_ALL_USER_CHECK } from './actionTypes';
export const onMgmtReportAllUsersToggled = (forAllUsers) => ({
    type: ON_FOR_ALL_USERS_CHECKCHANGED,
    payload: { forAllUsers }
});
export const resetAllUsersCheck = () => ({
    type: RESET_ALL_USER_CHECK
});