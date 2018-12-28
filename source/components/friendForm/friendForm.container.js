import { connect } from "react-redux";
import Friend from "./friendForm";
import { friendActions } from "../../redux/actions";

function mapStateToProps(state) {
  return {
    friendsState: state.friends
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFriends: () => {
      dispatch(friendActions.loadFriendAttemptAG());
    },
    changeActive: id => {
      dispatch(friendActions.changeFriendAG(id));
    },
    loadLocation: (searchTerm, Id) => {
      dispatch(friendActions.loadLocationTAAttempt(searchTerm, Id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friend);
