import { connect } from "react-redux";
import NavigationComponent from "./navigation";
import { userActions } from "../../redux/actions";

function mapStateToProps(state) {
  return {
    user: state.users.user,
    LoggedIn: state.users.LoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(userActions.getUserRequest())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent);
