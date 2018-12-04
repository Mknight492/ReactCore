import axios from "axios";
import { takeLatest } from "redux-saga";
import { put, call, select } from "redux-saga/effects";
import {
  loadTestApiSuccess,
  loadTestApiFailure,
  LOAD_TEST_API
} from "../actions/testActions";

function* TestApiRequest() {
  try {
    const APIdata = yield fetch("api/testapi");
    console.log(APIdata);
    const APIJson = yield APIdata.json();
    console.log(`${APIJson} from saga`);

    yield put(loadTestApiSuccess(APIJson));
  } catch (e) {
    yield put(loadTestApiFailure());
  }
}

export default function*() {
  yield takeLatest(LOAD_TEST_API, TestApiRequest);
}
