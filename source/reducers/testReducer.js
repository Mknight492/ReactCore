import { ADD_TEST } from "../actions/testActions";
import { LOCATION_CHANGE } from "connected-react-router";

const initalState = {
  testArray: []
};

export default function testReducer(state, action) {
  if (state === undefined) {
    return initalState;
  }

  switch (action.type) {
    case ADD_TEST:
      return {
        ...state,
        testArray: [...state.testArray, action.test]
      };
    case LOCATION_CHANGE:
      return initalState;
    default:
      return state;
  }
}
