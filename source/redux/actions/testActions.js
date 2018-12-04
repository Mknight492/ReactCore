export const ADD_TEST = "ADD_TEST";
export const ADD_TEST_SUCCESS = "ADD_TEST_FAILURE";
export const ADD_TEST_FAILURE = "ADD_TEST_FAILURE";
export const LOAD_TEST_API = "LOAD_TEST_API";
export const LOAD_TEST_API_SUCCESS = "LOAD_TEST_API_SUCCESS";
export const LOAD_TEST_API_FAILURE = "LOAD_TEST_API_FAILURE";
export const CHANGE_ACTIVE_TEST = "CHANGE_ACTIVE_TEST";

export const addTestGenerator = test => ({
  type: ADD_TEST,
  test
});
export const addTestSuccess = () => ({ type: ADD_TEST_SUCCESS });
export const addTestFailure = () => ({ type: ADD_TEST_FAILURE });

export const loadTestApi = () => ({ type: LOAD_TEST_API });

export const loadTestApiSuccess = testArray => ({
  type: LOAD_TEST_API_SUCCESS,
  payload: testArray
});

export const loadTestApiFailure = () => ({ type: LOAD_TEST_API_FAILURE });

export const changeTestGenerator = id => ({
  type: CHANGE_ACTIVE_TEST,
  payload: id
});
