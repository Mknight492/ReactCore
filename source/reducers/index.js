import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import { connectRouter } from 'connected-react-router'
import testReducer from './testReducer';


export default (history) => combineReducers({
    router: connectRouter(history),
    //test: testReducer,
})