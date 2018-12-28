import { put, call, takeLatest, all } from "redux-saga/effects"; //select allows you to access values from state
import { friendConstants } from "../constants";
import { friendActions } from "../actions";
import { weatherAPI } from "../../../security";
import { HF } from "../../helpers";
import { locationServices } from "../services";

function* loadFriendsData() {
  try {
    const friendArray = yield HF.AFfetch("api/friend");
    const friendArrayParsed = yield friendArray.json();
    yield put(friendActions.loadFriendSuccessAG(friendArrayParsed));
  } catch (e) {
    yield put(friendActions.loadFriendFailureAG());
  }
}

function* getLocationTypeAhead(action) {
  const { searchTerm, Id } = action;
  try {
    const results = yield locationServices.getCities(searchTerm);
    yield put(friendActions.loadLocationTASuccess(results, Id));
  } catch (e) {
    yield put(friendActions.loadLocationTAFailure(e));
  }
}

function* combiner() {
  yield all([
    takeLatest(friendConstants.LOAD_FRIEND_ATTEMPT, loadFriendsData),
    takeLatest(friendConstants.LOAD_LOCATION_TA_ATTEMPT, getLocationTypeAhead)
  ]);
}

export default combiner;

/*
export default function*() {
  yield takeLatest(friendConstants.LOAD_FRIEND_ATTEMPT, loadFriendsData);
}
*/

//wwwe
