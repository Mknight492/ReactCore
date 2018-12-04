import { connect } from "react-redux";
import App from "./app";
import {
  changeTestGenerator,
  loadTestApi
} from "../../redux/actions/testActions";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
