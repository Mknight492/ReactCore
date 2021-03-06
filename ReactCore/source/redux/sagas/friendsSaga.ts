import { put, call, takeLatest, all } from "redux-saga/effects/"; //select allows you to access values from state
import { delay } from "redux-saga";
import { friendConstants } from "redux/constants/index";
import { friendActions, handleHTTPError } from "../actions/index";
import { HF } from "../../helpers/index";
import { locationServices } from "../services/index";

//import { Friend } from "../../models/index";

function* loadFriendsData() {
  try {
    const friendArray = yield HF.ServerAxios({ url: "api/friend/getall" });

    //const friendArrayParsed = yield friendArray.json()
    yield put(friendActions.loadFriendSuccessAG(friendArray.data));
  } catch (e) {
    yield put(friendActions.loadFriendFailureAG());
  }
}

function* getLocationTypeAhead(action) {
  const { searchTerm, Id } = action;
  try {
    yield call(delay, 300);
    const results = yield locationServices.getCities(searchTerm);
    yield put(friendActions.loadLocationTASuccess(results, Id));
  } catch (error) {
    yield put(handleHTTPError(error, undefined));
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
