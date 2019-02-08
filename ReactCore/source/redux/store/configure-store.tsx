import * as React from "react";

//redux imports
import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "redux/reducers/index";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
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
const middleWares = [sagaMiddleware, thunkMiddleware];
const storeEnhancers: any[] = [];

const middlewareEnhancer = applyMiddleware(...middleWares);
storeEnhancers.unshift(middlewareEnhancer);

const configureStore = () => {
  const store = createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(...storeEnhancers)
  );
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
//sagaMiddleware.run(rootSaga);

const Root = props => {
  return <Provider store={store}>{props.children}</Provider>;
};
const SagaRootKit = { sagaMiddleware, rootSaga, configureTestStore };

//no sagas are run - but allows inital state to be passed in;
//there may be a workaround with a statefull component that runs saga on loading..

//MOCK STORES

interface IProps {
  initialState: any;
  children: React.ReactNode;
}

const TestRoot: React.FunctionComponent<IProps> = ({
  children,
  initialState = {}
}) => {
  return (
    <Provider store={configureTestStore(initialState)}>{children}</Provider>
  );
};

const SagaTestRoot = ({ initialState = {}, children }) => {
  store = configureStoreTestSaga(initialState);
  return <Provider store={store}>{children}</Provider>;
};

export {
  store,
  SagaTestRoot,
  Root,
  TestRoot,
  sagaMiddleware,
  rootSaga,
  SagaRootKit,
  configureStore
};

function configureTestStore(initialState) {
  const store = createStore(
    createRootReducer(),
    initialState,
    compose(...storeEnhancers)
  );
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

function configureStoreTestSaga(initialState) {
  const store = createStore(
    createRootReducer(),
    initialState,
    compose(...storeEnhancers)
  );
  SagaManager.startSagas(sagaMiddleware);
  return store;
}
