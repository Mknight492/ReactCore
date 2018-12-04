import { connect } from "react-redux";
import indexPage from "./index-page";
import { addTestGenerator } from "../../../redux/actions/testActions";
import { userActions } from "../../../redux/actions";

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTest: test => {
      dispatch(addTestGenerator(test));
    },
    getUsers: () => {
      dispatch(userActions.getAll());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(indexPage);
