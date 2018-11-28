import {
  ADD_TEST,
  LOAD_TEST_API,
  LOAD_TEST_API_FAILURE,
  LOAD_TEST_API_SUCCESS
} from "../actions/testActions";

const initalState = {
  testArray: []
};

export default function testReducer(state, action) {
  if (state === undefined) {
    return initalState;
  }

  switch (action.type) {
    case LOAD_TEST_API:
      return state;
    case LOAD_TEST_API_FAILURE:
      return state;
    case LOAD_TEST_API_SUCCESS:
      return {
        testArray: formatTestApiData(action.testArray)
      };
    case ADD_TEST:
      return {
        ...state,
        testArray: [...state.testArray, action.test]
      };
    default:
      return state;
  }
}

function formatTestApiData(apiArray) {
  console.log(apiArray);
  return apiArray.map(el => el.testString);
}
