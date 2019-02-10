import { friendConstants } from "../constants";
import { Friend, EditFriendModel } from "models";

export const addFriendAttemptAG = test => ({
  type: friendConstants.ADD_FRIEND_ATTEMPT,
  test
});

export const addFriendSuccessAG = () => ({
  type: friendConstants.ADD_FRIEND_SUCCESS
});

export const addFriendFailureAG = () => ({
  type: friendConstants.ADD_FRIEND_FAILURE
});

export const loadFriendAttemptAG = () => ({
  type: friendConstants.LOAD_FRIEND_ATTEMPT
});

export const loadFriendSuccessAG = friendArray => ({
  type: friendConstants.LOAD_FRIEND_SUCCESS,
  payload: friendArray
});

export const loadFriendFailureAG = () => ({
  type: friendConstants.LOAD_FRIEND_FAILURE
});

export const editFriendSuccessAG = (friend: EditFriendModel) => ({
  type: friendConstants.EDIT_FRIEND_SUCCESS,
  payload: friend
});

export const deleteFriendSuccessAG = (Id: number) => ({
  type: friendConstants.DELETE_FRIEND_SUCCESS,
  payload: Id
});

export const changeFriendAG = id => ({
  type: friendConstants.CHANGE_ACTIVE_FRIEND,
  payload: id
});

export const loadLocationTAAttempt = (searchTerm, Id) => ({
  type: friendConstants.LOAD_LOCATION_TA_ATTEMPT,
  searchTerm,
  Id
});

export const loadLocationTASuccess = (locationArray, Id) => ({
  type: friendConstants.LOAD_LOCATION_TA_SUCCESS,
  payload: locationArray,
  Id
});

export const loadLocationTAFailure = () => ({
  type: friendConstants.LOAD_LOCATION_TA_FAILURE
});

export const resetFriendsTAValues = id => ({
  type: friendConstants.RESET_FRIENDS_TA_VALUES,
  id
});

export const resetLocationTA = id => ({
  type: friendConstants.RESET_LOCATION_TA,
  id
});

export const friendActions = {
  addFriendAttemptAG,
  addFriendSuccessAG,
  addFriendFailureAG,
  loadFriendAttemptAG,
  loadFriendSuccessAG,
  loadFriendFailureAG,
  editFriendSuccessAG,
  deleteFriendSuccessAG,
  changeFriendAG,
  loadLocationTAAttempt,
  loadLocationTASuccess,
  loadLocationTAFailure,
  resetLocationTA,
  resetFriendsTAValues
};
