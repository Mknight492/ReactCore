import { connect } from "react-redux";
import Friends from "./friends";
import { friendActions } from "../../redux/actions";

function mapStateToProps(state) {
  return {
    friendsObj: state.friends.friendsObj,
    isActive: state.friends.isActive
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFriends: () => {
      dispatch(friendActions.loadFriendAttemptAG());
    },
    changeActive: id => {
      dispatch(friendActions.changeFriendAG(id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);
