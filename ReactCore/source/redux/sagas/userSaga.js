import { put, call, takeLatest, all } from "redux-saga/effects"; //select allows you to access values from state
import { userConstants } from "../constants";
import { userActions } from "../actions";
import { HF } from "../../helpers";

function* getUser() {
  try {
    const user = yield HF.Appfetch("api/Authenticate/CheckUser");
    const userJson = yield user.json();
    if (userJson.notLoggedIn) {
      yield put(userActions.getUserFailure());
    } else {
      yield put(userActions.getUserSuccess(userJson));
    }
  } catch (e) {
    yield put(userActions.getUserFailure());
  }
}

function* combiner() {
  yield all([takeLatest(userConstants.GET_USER_REQUEST, getUser)]);
}

export default combiner;

/*
export default function*() {
  yield takeLatest(friendConstants.LOAD_FRIEND_ATTEMPT, loadFriendsData);
}
*/

//wwwe
