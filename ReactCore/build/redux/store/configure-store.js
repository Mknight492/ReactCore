"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//redux imports
const redux_1 = require("redux");
const index_1 = require("redux/reducers/index");
const react_redux_1 = require("react-redux");
//logger imports
const redux_logger_1 = require("redux-logger");
//Saga Imports
const redux_saga_1 = require("redux-saga");
const redux_thunk_1 = require("redux-thunk");
const sagas_1 = require("../sagas");
exports.rootSaga = sagas_1.default;
//generating initial state
const initialState = {};
//generate middleware
const sagas = redux_saga_1.default();
exports.sagas = sagas;
//generating redux store with middleware NB routerMiddleWare must remain fist
const middleWare = redux_1.applyMiddleware(redux_logger_1.createLogger(), sagas, redux_thunk_1.default);
const configureStore = () => {
    const store = redux_1.createStore(index_1.default(), initialState, middleWare);
    console.log("store created");
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
exports.store = store;
sagas.run(sagas_1.default);
const Root = props => {
    return React.createElement(react_redux_1.Provider, { store: store }, props.children);
};
exports.Root = Root;
const SagaRootKit = { sagas, rootSaga: sagas_1.default, configureTestStore };
exports.SagaRootKit = SagaRootKit;
const TestRoot = ({ children, initialState = {} }) => {
    return (React.createElement(react_redux_1.Provider, { store: configureTestStore(initialState) }, children));
};
exports.TestRoot = TestRoot;
const SagaTestRoot = ({ SagaRootKit, initialState = {}, children }) => {
    exports.store = store = configureTestStore(initialState);
    SagaRootKit.sagas.run(SagaRootKit.rootSaga);
    return React.createElement(react_redux_1.Provider, { store: store }, children);
};
exports.SagaTestRoot = SagaTestRoot;
function configureTestStore(initialState) {
    const store = redux_1.createStore(index_1.default(), initialState, middleWare);
    console.log("store created");
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
}
//# sourceMappingURL=configure-store.js.map