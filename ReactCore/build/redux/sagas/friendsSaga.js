"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects/"); //select allows you to access values from state
const index_1 = require("redux/constants/index");
const index_2 = require("../actions/index");
const index_3 = require("../../helpers/index");
const index_4 = require("../services/index");
//import { Friend } from "../../models/index";
function* loadFriendsData() {
    try {
        const friendArray = yield index_3.HF.AppAxios({ url: "api/friend/getAll" });
        console.log(friendArray);
        //const friendArrayParsed = yield friendArray.json()
        yield effects_1.put(index_2.friendActions.loadFriendSuccessAG(friendArray.data));
    }
    catch (e) {
        yield effects_1.put(index_2.friendActions.loadFriendFailureAG());
    }
}
function* getLocationTypeAhead(action) {
    const { searchTerm, Id } = action;
    try {
        const results = yield index_4.locationServices.getCities(searchTerm);
        yield effects_1.put(index_2.friendActions.loadLocationTASuccess(results, Id));
    }
    catch (error) {
        yield effects_1.put(index_2.handleHTTPError(error, undefined));
    }
}
function* combiner() {
    yield effects_1.all([
        effects_1.takeLatest(index_1.friendConstants.LOAD_FRIEND_ATTEMPT, loadFriendsData),
        effects_1.takeLatest(index_1.friendConstants.LOAD_LOCATION_TA_ATTEMPT, getLocationTypeAhead)
    ]);
}
exports.default = combiner;
/*
export default function*() {
  yield takeLatest(friendConstants.LOAD_FRIEND_ATTEMPT, loadFriendsData);
}
*/
//wwwe
//# sourceMappingURL=friendsSaga.js.map