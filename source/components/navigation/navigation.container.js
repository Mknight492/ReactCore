import { connect } from "react-redux";
import NavigationComponent from "./navigation";

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent);
