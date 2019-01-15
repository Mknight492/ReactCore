"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects"); //select allows you to access values from state
const index_1 = require("../constants/index");
const index_2 = require("../actions/index");
const index_3 = require("../../helpers/index");
function* getUser() {
    try {
        const user = yield index_3.HF.Appfetch("api/Authenticate/CheckUser");
        const userJson = yield user.json();
        if (userJson.notLoggedIn) {
            yield effects_1.put(index_2.userActions.getUserFailure());
        }
        else {
            yield effects_1.put(index_2.userActions.getUserSuccess(userJson));
        }
    }
    catch (e) {
        yield effects_1.put(index_2.userActions.getUserFailure());
    }
}
function* combiner() {
    yield effects_1.all([effects_1.takeLatest(index_1.userConstants.GET_USER_REQUEST, getUser)]);
}
exports.default = combiner;
/*
export default function*() {
  yield takeLatest(friendConstants.LOAD_FRIEND_ATTEMPT, loadFriendsData);
}
*/
//wwwe
//# sourceMappingURL=userSaga.js.map