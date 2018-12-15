import { put, call, takeLatest } from "redux-saga/effects"; //select allows you to access values from state
import { friendConstants } from "../constants";
import { friendActions } from "../actions";

function* APIRequest() {
  try {
    const friendArray = yield call(fetch("api/friends"));
    const friendArrayParsed = yield friendArray.json();
    yield put(friendActions.addFriendSuccessAG(friendArrayParsed));
  } catch (e) {
    yield put(friendActions.addFriendFailureAG());
  }
}

export default function*() {
  yield takeLatest(friendConstants.ADD_FRIEND_ATTEMPT, APIRequest);
}

//wwwe
