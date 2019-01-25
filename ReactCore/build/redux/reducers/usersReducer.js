import { userConstants } from "../constants";
const initialState = {
    LoggedIn: false,
    user: undefined,
    noUserActive: undefined,
    loading: false
};
export default function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return Object.assign({}, state, { loading: true });
        case userConstants.GET_USER_REQUEST:
            return Object.assign({}, state, { loading: true });
        case userConstants.GET_USER_FAILURE:
            return Object.assign({}, state, { loading: false, noUserActive: true });
        case userConstants.GET_USER_SUCCESS:
            //payload = user{}
            return Object.assign({}, state, { LoggedIn: true, user: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=usersReducer.js.map