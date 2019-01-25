"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const weatherSaga_1 = __importDefault(require("./weatherSaga"));
const friendsSaga_1 = __importDefault(require("./friendsSaga"));
const userSaga_1 = __importDefault(require("./userSaga"));
function* rootSaga() {
    yield effects_1.all([weatherSaga_1.default(), friendsSaga_1.default(), userSaga_1.default()]);
}
exports.default = rootSaga;
//# sourceMappingURL=index.js.map