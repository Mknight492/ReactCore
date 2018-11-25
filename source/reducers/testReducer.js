import {ADD_TEST} from '../actions/testActions'

const initalState ={
    testArray :  ['one']
}

export default function testReducer(state, action){
    if(state == undefined){
        return initalState
    }

    switch(state.type){
        case ADD_TEST:
            return{
                ...state,
                testArray: [...state.testArray, action.test]
            }
    }
}