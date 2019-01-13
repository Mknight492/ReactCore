import React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import Test2 from "../../test/test2";
import { userActions } from "../../../redux/actions";

class HomePage extends React.Component {
  componentDidMount() {
    //this.props.getUsers();
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {
    return (
      <>
        <h2> you shouldn't be here</h2>
        <h2> you shouldn't be here</h2>
        <h2> you shouldn't be here</h2>
        <Test2 />
      </>
    );
  }
}

export default HomePage;
