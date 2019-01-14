import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
// @ts-ignore
import { Test2 } from "../../test/test2.tsx";
// @ts-ignore
import { Hello } from "../../test/test3.tsx";
import { userActions } from "../../../redux/actions";

const IndexPage: React.SFC = props => {
  return (
    <>
      <h2> you shouldn't be here</h2>
      <h2> you shouldn't be here</h2>
      <h2> you shouldn't be here</h2>
      <Test2 />
      <Hello compiler="typescript" framework={"React"} />
    </>
  );
};

export { IndexPage };
