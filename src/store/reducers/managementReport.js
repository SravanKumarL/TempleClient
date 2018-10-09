import { ON_FOR_ALL_USERS_CHECKCHANGED, RESET_ALL_USER_CHECK } from '../actions/actionTypes';
const defaultState = { forAllUsers: false };
const ManagementReport = (state = defaultState, action) => {
    switch (action.type) {
        case ON_FOR_ALL_USERS_CHECKCHANGED:
            return { ...state, forAllUsers: action.payload.forAllUsers };
        case RESET_ALL_USER_CHECK:
            return defaultState;
        default:
            return state;
    }
}
export default ManagementReport;