import {
  ADD_TEST,
  LOAD_TEST_API,
  LOAD_TEST_API_FAILURE,
  LOAD_TEST_API_SUCCESS,
  CHANGE_ACTIVE_TEST
} from "../actions/testActions";
import { mapKeys } from "lodash";

const initalState = {
  testArray: {},
  isActive: undefined
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
      //action.payload = [test{testString, ID}]
      const testArray = mapKeys(action.payload, "id");
      return { ...state, testArray };
    case ADD_TEST:
      return {
        ...state,
        testArray: [...state.testArray, action.test]
      };
    case CHANGE_ACTIVE_TEST:
      //action.paylod = id (of currently active test item)
      return {
        ...state,
        isActive: action.payload
      };
    default:
      return state;
  }
}

function formatTestApiData(apiArray) {
  return apiArray.map(el => testString);
}
