import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { Test2 } from "../../test/test2";
import { Test3 } from "../../test/test3";
import { userActions } from "../../../redux/actions";

interface IProps {
  path: string;
}

const IndexPage: React.SFC<IProps> = props => {
  return (
    <>
      <h2> you shouldn't be here...</h2>
      <h2> you shouldn't be here</h2>
      <Test2 />
      <Test3 />
    </>
  );
};

export default IndexPage;
