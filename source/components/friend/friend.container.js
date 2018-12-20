import { connect } from "react-redux";
import Friend from "./friend";
import { friendActions } from "../../redux/actions";

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friend);
