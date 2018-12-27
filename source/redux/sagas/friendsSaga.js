import { put, call, takeLatest } from "redux-saga/effects"; //select allows you to access values from state
import { friendConstants } from "../constants";
import { friendActions } from "../actions";
import { weatherAPI } from "../../../security";
import { HF } from "../../helpers";

function* loadFriendsData() {
  try {
    const friendArray = yield HF.AFfetch("api/friend");
    const friendArrayParsed = yield friendArray.json();
    yield put(friendActions.loadFriendSuccessAG(friendArrayParsed));
  } catch (e) {
    yield put(friendActions.loadFriendFailureAG());
  }
}

export default function*() {
  yield takeLatest(friendConstants.LOAD_FRIEND_ATTEMPT, loadFriendsData);
}

//wwwe