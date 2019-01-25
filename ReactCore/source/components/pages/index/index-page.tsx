import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { Test2 } from "../../test/test2";
import { Test3 } from "../../test/test3";
import { userActions } from "../../../redux/actions";

import TypeAhead from "components/typeAhead/typeAhead";
import { LocationArrayMock1 } from "test/mocks";
import POJS from "./POJS.js";

interface IProps {
  path: string;
}

const IndexPage: React.SFC<IProps> = props => {
  return (
    <>
      <h2> you shouldn't be here..</h2>
      <h2> you shouldn't be here...</h2>
      {/* <Random /> */}
      <Test2 />
      <Test3 />
      <POJS />
      {/* <TypeAhead suggestions={LocationArrayMock1} /> */}
    </>
  );
};

export default IndexPage;
