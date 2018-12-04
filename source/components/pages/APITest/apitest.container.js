import { connect } from "react-redux";
import ApiTestPage from "./apitest";
import {
  loadTestApi,
  addTestGenerator
} from "../../../redux/actions/testActions";

function mapStateToProps(state) {
  return {
    testArray: state.test.testArray
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAPI: () => {
      dispatch(loadTestApi());
    },
    addTestApi: string => {
      dispatch(addTestGenerator(string));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiTestPage);
