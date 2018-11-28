import { connect } from "react-redux";
import ApiTestPage from "./apitest";
import { loadTestApi } from "../../../actions/testActions";

function mapStateToProps(state) {
  return {
    testArray: state.test.testArray
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAPI: () => {
      dispatch(loadTestApi());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiTestPage);
