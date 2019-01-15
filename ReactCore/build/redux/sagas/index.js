"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const weatherSaga_1 = require("./weatherSaga");
const friendsSaga_1 = require("./friendsSaga");
const userSaga_1 = require("./userSaga");
function* rootSaga() {
    yield effects_1.all([weatherSaga_1.default(), friendsSaga_1.default(), userSaga_1.default()]);
}
exports.default = rootSaga;
//# sourceMappingURL=index.js.map