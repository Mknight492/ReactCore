"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//redux imports
const redux_1 = require("redux");
const index_1 = require("../reducers/index");
//logger imports
const redux_logger_1 = require("redux-logger");
//Saga Imports
const redux_saga_1 = require("redux-saga");
const redux_thunk_1 = require("redux-thunk");
const sagas_1 = require("../sagas");
//generating initial state
const initialState = {};
//generate middleware
const sagas = redux_saga_1.default();
//generating redux store with middleware NB routerMiddleWare must remain fist
const middleWare = redux_1.applyMiddleware(redux_logger_1.createLogger(), sagas, redux_thunk_1.default);
const configureStore = () => {
    const store = redux_1.createStore(index_1.default(), initialState, middleWare);
    console.log("store created - attempt HMR");
    if (module.hot) {
        console.log("attempting HMR");
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            const nextRootReducer = require("../reducers").default();
            store.replaceReducer(nextRootReducer);
            console.log("HMR complete");
        });
    }
    return store;
};
let store = configureStore();
sagas.run(sagas_1.default);
exports.default = store;
//# sourceMappingURL=configure-store.js.map