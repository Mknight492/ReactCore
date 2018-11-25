
import createRootReducer from '../reducers/index';

//redux imports
import {createStore, applyMiddleware} from 'redux'

//logger imports
import { createLogger } from 'redux-logger'

//Saga Imports
import createSagaMiddleware from 'redux-saga'

//router imports
import { routerMiddleware } from 'connected-react-router'
import createBrowserHistory from 'history/createBrowserHistory'

//generating initial state
const initialState = {}


const history = createBrowserHistory()

//generate middleware
const sagas = createSagaMiddleware()

const middleWare =applyMiddleware(
    routerMiddleware(history),
    createLogger(),
    sagas
)


const configureStore = () =>{
  const store = createStore(
    createRootReducer(history),
    initialState,
    middleWare
  )
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store
}


export {history, configureStore};

/*
 {
  const store = createStore(rootReducer, initialState);



  return store;
}
*/

