import { connect } from "react-redux";
import Friends from "./friends";
import { friendActions } from "../../redux/actions";

function mapStateToProps(state) {
  return {
    friendsObj: state.friends.friendsObj
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFriends: () => {
      dispatch(friendActions.loadFriendAttemptAG());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);
