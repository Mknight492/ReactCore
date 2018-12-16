import { connect } from "react-redux";
import Friend from "./friend";
import { friendActions } from "../../redux/actions";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    getFriendWeather: (lat, long) => {
      dispatch();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friend);
