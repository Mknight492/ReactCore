import { friendConstants } from "../constants";

export const addTestGenerator = test => ({
  type: friendConstants.ADD_TEST,
  test
});
export const addTestSuccess = () => ({
  type: friendConstants.ADD_TEST_SUCCESS
});
export const addTestFailure = () => ({
  type: friendConstants.ADD_TEST_FAILURE
});

export const loadTestApi = () => ({ type: friendConstants.LOAD_TEST_API });

export const loadTestApiSuccess = testArray => ({
  type: friendConstants.LOAD_TEST_API_SUCCESS,
  payload: testArray
});

export const loadTestApiFailure = () => ({
  type: friendConstants.LOAD_TEST_API_FAILURE
});

export const changeTestGenerator = id => ({
  type: friendConstants.CHANGE_ACTIVE_TEST,
  payload: id
});
