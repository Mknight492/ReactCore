"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//redux imports
var redux_1 = require("redux");
var index_1 = require("../reducers/index");
//logger imports
var redux_logger_1 = require("redux-logger");
//Saga Imports
var redux_saga_1 = require("redux-saga");
var redux_thunk_1 = require("redux-thunk");
var sagas_1 = require("../sagas");
//generating initial state
var initialState = {};
//generate middleware
var sagas = redux_saga_1.default();
exports.sagas = sagas;
//generating redux store with middleware NB routerMiddleWare must remain fist
var middleWare = redux_1.applyMiddleware(redux_logger_1.createLogger(), sagas, redux_thunk_1.default);
var configureStore = function () {
    var store = redux_1.createStore(index_1.default(), initialState, middleWare);
    console.log("store created - attempt HMR");
    if (module.hot) {
        console.log("attempting HMR");
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", function () {
            var nextRootReducer = require("../reducers").default();
            store.replaceReducer(nextRootReducer);
            console.log("HMR complete");
        });
    }
    return store;
};
exports.configureStore = configureStore;
var store = configureStore();
exports.store = store;
sagas.run(sagas_1.default);
//# sourceMappingURL=configure-store.js.map