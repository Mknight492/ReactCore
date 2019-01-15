"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const addFriendAttemptAG = test => ({
    type: constants_1.friendConstants.ADD_FRIEND_ATTEMPT,
    test
});
const addFriendSuccessAG = () => ({
    type: constants_1.friendConstants.ADD_FRIEND_SUCCESS
});
const addFriendFailureAG = () => ({
    type: constants_1.friendConstants.ADD_FRIEND_FAILURE
});
const loadFriendAttemptAG = () => ({
    type: constants_1.friendConstants.LOAD_FRIEND_ATTEMPT
});
const loadFriendSuccessAG = friendArray => ({
    type: constants_1.friendConstants.LOAD_FRIEND_SUCCESS,
    payload: friendArray
});
const loadFriendFailureAG = () => ({
    type: constants_1.friendConstants.LOAD_FRIEND_FAILURE
});
const changeFriendAG = id => ({
    type: constants_1.friendConstants.CHANGE_ACTIVE_FRIEND,
    payload: id
});
const loadLocationTAAttempt = (searchTerm, Id) => ({
    type: constants_1.friendConstants.LOAD_LOCATION_TA_ATTEMPT,
    searchTerm,
    Id
});
const loadLocationTASuccess = (locationArray, Id) => ({
    type: constants_1.friendConstants.LOAD_LOCATION_TA_SUCCESS,
    payload: locationArray,
    Id
});
const loadLocationTAFailure = () => ({
    type: constants_1.friendConstants.LOAD_LOCATION_TA_FAILURE
});
const resetLocationTA = { type: constants_1.friendConstants.RESET_LOCATION_TA };
exports.friendActions = {
    addFriendAttemptAG,
    addFriendSuccessAG,
    addFriendFailureAG,
    loadFriendAttemptAG,
    loadFriendSuccessAG,
    loadFriendFailureAG,
    changeFriendAG,
    loadLocationTAAttempt,
    loadLocationTASuccess,
    loadLocationTAFailure,
    resetLocationTA
};
//# sourceMappingURL=friendActions.js.map