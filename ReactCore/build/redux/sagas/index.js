import { all } from "redux-saga/effects";
import weatherSaga from "./weatherSaga";
import friendSaga from "./friendsSaga";
import userSaga from "./userSaga";
export default function* rootSaga() {
    yield all([weatherSaga(), friendSaga(), userSaga()]);
}
//# sourceMappingURL=index.js.map