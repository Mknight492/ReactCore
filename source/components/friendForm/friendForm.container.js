import { connect } from "react-redux";
import Friend from "./friendForm";
import { friendActions } from "../../redux/actions";

function mapStateToProps(state) {
  return {};
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
)(Friend);
