import { ADD_TEST } from "../actions/testActions";

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
    default:
      return state;
  }
}
