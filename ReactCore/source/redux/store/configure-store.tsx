import * as React from "react";

//redux imports
import { createStore, applyMiddleware } from "redux";
import createRootReducer from "redux/reducers/index";
import { Provider } from "react-redux";

//logger imports
import { createLogger } from "redux-logger";

//Saga Imports
import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import rootSaga from "../sagas";

//generating initial state
const initialState = {};

//generate middleware
const sagas = createSagaMiddleware();

//generating redux store with middleware NB routerMiddleWare must remain fist
const middleWare = applyMiddleware(createLogger(), sagas, thunkMiddleware);

const configureStore = () => {
  const store = createStore(createRootReducer(), initialState, middleWare);
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
sagas.run(rootSaga);

const Root = props => {
  return <Provider store={store}>{props.children}</Provider>;
};
const SagaRootKit = { sagas, rootSaga, configureTestStore };

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

const SagaTestRoot = ({ SagaRootKit, initialState = {}, children }) => {
  store = configureTestStore(initialState);
  SagaRootKit.sagas.run(SagaRootKit.rootSaga);
  return <Provider store={store}>{children}</Provider>;
};

export { store, SagaTestRoot, Root, TestRoot, sagas, rootSaga, SagaRootKit };

function configureTestStore(initialState) {
  const store = createStore(createRootReducer(), initialState, middleWare);
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
