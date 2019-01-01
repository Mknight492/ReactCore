import { connect } from "react-redux";
import { userActions } from "../../redux/actions";
import App from "./app";

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
)(App);
