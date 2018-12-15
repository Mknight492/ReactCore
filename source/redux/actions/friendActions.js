import { friendConstants } from "../constants";

export const friendActions = {
  addFriendAttemptAG,
  addFriendSuccessAG,
  addFriendFailureAG,
  loadFriendAttemptAG,
  loadFriendSuccessAG,
  loadFriendFailureAG,
  changeFriendAG
};

const addFriendAttemptAG = test => ({
  type: friendConstants.ADD_FRIEND_ATTEMPT,
  test
});
const addFriendSuccessAG = () => ({
  type: friendConstants.ADD_FRIEND_SUCCESS
});
const addFriendFailureAG = () => ({
  type: friendConstants.ADD_FRIEND_FAILURE
});

const loadFriendAttemptAG = () => ({
  type: friendConstants.LOAD_FRIEND_ATTEMPT
});

const loadFriendSuccessAG = friendArray => ({
  type: friendConstants.LOAD_FRIEND_SUCCESS,
  payload: friendArray
});

const loadFriendFailureAG = () => ({
  type: friendConstants.LOAD_FRIEND_FAILURE
});

const changeFriendAG = id => ({
  type: friendConstants.CHANGE_ACTIVE_FRIEND,
  payload: id
});
