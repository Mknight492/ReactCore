import { connect } from "react-redux";
import Friend from "./friendForm";
import {
  changeTestGenerator,
  loadTestApi
} from "../../redux/actions/testActions";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeActiveTest: id => {
      dispatch(changeTestGenerator(id));
    },
    loadAPI: () => {
      dispatch(loadTestApi());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friend);
