import { connect } from "react-redux";
import Friend from "./friend";
import { friendActions } from "../../redux/actions";
import OutsideClick from "../../higherOrderComponents/OutsideClick";
import React from "react";
import FriendComponent from "./friend";

function mapStateToProps(state) {
  return {
    isActive: state.friends.isActive
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeActive: id => {
      dispatch(friendActions.changeFriendAG(id));
    },
    loadFriends: () => {
      dispatch(friendActions.loadFriendAttemptAG());
    }
  };
}

const ConnectFriend = connect(
  mapStateToProps,
  mapDispatchToProps
)(Friend);

export default OutsideClick(ConnectFriend);
