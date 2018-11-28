export const ADD_TEST = "ADD_TEST";
export const LOAD_TEST_API = "LOAD_TEST_API";
export const LOAD_TEST_API_SUCCESS = "LOAD_TEST_API_SUCCESS";
export const LOAD_TEST_API_FAILURE = "LOAD_TEST_API_FAILURE";

export const addTestGenerator = test => ({
  type: ADD_TEST,
  test
});

export const loadTestApi = () => ({ type: LOAD_TEST_API });

export const loadTestApiSuccess = testArray => ({
  type: LOAD_TEST_API_SUCCESS,
  testArray
});

export const loadTestApiFailure = () => ({ type: LOAD_TEST_API_FAILURE });
