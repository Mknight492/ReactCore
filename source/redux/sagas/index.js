import { all } from "redux-saga/effects";

import weatherSaga from "./weatherSaga";
import friendSaga from "./friendsSaga";
export default function* rootSage() {
  yield all([weatherSaga(), friendSaga()]);
}
