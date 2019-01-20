import { put, call, takeLatest, all } from "redux-saga/effects"; //select allows you to access values from state
import { userConstants } from "../constants/index";
import { userActions } from "../actions/index";
import { HF } from "../../helpers/index";

function* getUser() {
  try {
    const requestionOptions = {
      url: "/api/Authenticate/CheckUser"
    };

    const APIresponse = yield HF.AppAxios(requestionOptions);

    if (APIresponse.data.notLoggedIn) {
      //customis this to pop up login modal
      yield put(userActions.getUserFailure());
    } else {
      yield put(userActions.getUserSuccess(APIresponse.data));
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
