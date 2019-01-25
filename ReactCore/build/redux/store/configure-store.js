import * as React from "react";
//redux imports
import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "redux/reducers/index";
import { Provider } from "react-redux";
//logger imports
import { createLogger } from "redux-logger";
//Saga Imports
import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import rootSaga from "../sagas";
import SagaManager from "redux/sagas/sagaManager";
//generating initial state
const initialState = {};
//generate middleware
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
//generating redux store with middleware NB routerMiddleWare must remain fist
const middleWares = [logger, sagaMiddleware, thunkMiddleware];
const storeEnhancers = [];
const middlewareEnhancer = applyMiddleware(...middleWares);
storeEnhancers.unshift(middlewareEnhancer);
const configureStore = () => {
    const store = createStore(createRootReducer(), initialState, compose(...storeEnhancers));
    SagaManager.startSagas(sagaMiddleware);
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
            SagaManager.cancelSagas(store);
            require("../sagas/sagaManager").default.startSagas(sagaMiddleware);
            console.log("saga HMR complete");
        });
    }
    return store;
};
let store = configureStore();
sagaMiddleware.run(rootSaga);
const Root = props => {
    return React.createElement(Provider, { store: store }, props.children);
};
const SagaRootKit = { sagaMiddleware, rootSaga, configureTestStore };
const TestRoot = ({ children, initialState = {} }) => {
    return (React.createElement(Provider, { store: configureTestStore(initialState) }, children));
};
const SagaTestRoot = ({ SagaRootKit, initialState = {}, children }) => {
    store = configureTestStore(initialState);
    SagaRootKit.sagaMiddleware.run(SagaRootKit.rootSaga);
    return React.createElement(Provider, { store: store }, children);
};
export { store, SagaTestRoot, Root, TestRoot, sagaMiddleware, rootSaga, SagaRootKit, configureStore };
function configureTestStore(initialState) {
    const store = createStore(createRootReducer(), initialState, compose(...storeEnhancers));
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