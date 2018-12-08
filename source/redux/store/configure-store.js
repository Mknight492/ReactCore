//redux imports
import { createStore, applyMiddleware } from "redux";
import createRootReducer from "../reducers/index";

//logger imports
import { createLogger } from "redux-logger";

//Saga Imports
import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";

//generating initial state
const initialState = {};

//generating redux store with middleware NB routerMiddleWare must remain fist

//generate middleware
const sagas = createSagaMiddleware();

const middleWare = applyMiddleware(createLogger(), sagas, thunkMiddleware);

const configureStore = () => {
  const store = createStore(createRootReducer(), initialState, middleWare);
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

export { configureStore, sagas };

//f