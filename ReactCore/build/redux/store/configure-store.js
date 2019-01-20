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
const sagaManager_1 = require("redux/sagas/sagaManager");
//generating initial state
const initialState = {};
//generate middleware
const sagaMiddleware = redux_saga_1.default();
exports.sagaMiddleware = sagaMiddleware;
const logger = redux_logger_1.createLogger();
//generating redux store with middleware NB routerMiddleWare must remain fist
const middleWares = [logger, sagaMiddleware, redux_thunk_1.default];
const storeEnhancers = [];
const middlewareEnhancer = redux_1.applyMiddleware(...middleWares);
storeEnhancers.unshift(middlewareEnhancer);
const configureStore = () => {
    const store = redux_1.createStore(index_1.default(), initialState, redux_1.compose(...storeEnhancers));
    sagaManager_1.default.startSagas(sagaMiddleware);
    console.log("store created");
    if (module.hot) {
        console.log("attempting HMR");
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            console.log("here");
            const nextRootReducer = require("../reducers").default();
            store.replaceReducer(nextRootReducer);
            console.log("reducer complete");
        });
        module.hot.accept("../sagas/sagaManager", () => {
            sagaManager_1.default.cancelSagas(store);
            require("../sagas/sagaManager").default.startSagas(sagaMiddleware);
            console.log("saga HMR complete");
        });
    }
    return store;
};
exports.configureStore = configureStore;
let store = configureStore();
exports.store = store;
sagaMiddleware.run(sagas_1.default);
const Root = props => {
    return React.createElement(react_redux_1.Provider, { store: store }, props.children);
};
exports.Root = Root;
const SagaRootKit = { sagaMiddleware, rootSaga: sagas_1.default, configureTestStore };
exports.SagaRootKit = SagaRootKit;
const TestRoot = ({ children, initialState = {} }) => {
    return (React.createElement(react_redux_1.Provider, { store: configureTestStore(initialState) }, children));
};
exports.TestRoot = TestRoot;
const SagaTestRoot = ({ SagaRootKit, initialState = {}, children }) => {
    exports.store = store = configureTestStore(initialState);
    SagaRootKit.sagaMiddleware.run(SagaRootKit.rootSaga);
    return React.createElement(react_redux_1.Provider, { store: store }, children);
};
exports.SagaTestRoot = SagaTestRoot;
function configureTestStore(initialState) {
    const store = redux_1.createStore(index_1.default(), initialState, redux_1.compose(...storeEnhancers));
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