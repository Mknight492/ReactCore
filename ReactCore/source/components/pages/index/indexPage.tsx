import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { Test2 } from "../../test/test2";
import { Test3 } from "../../test/test3";
import { userActions } from "../../../redux/actions";

import TypeAhead from "components/typeAhead/typeAhead";
import { LocationArrayMock1 } from "test/mocks";

import * as styles from "./indexPage.module.scss";

interface IProps {
  path: string;
}

const IndexPage: React.SFC<IProps> = props => {
  return (
    <div className="large-hero js-waypoint" id="home" data-link="home--link">
      <picture className={styles.background}>
        <source
          srcSet="dist/images/farewell-1177_1920.jpg"
          media="(min-width: 1200px)"
        />
        <source
          srcSet="dist/images/farewell-785_1280.jpg"
          media="(min-width: 760px)"
        />
        <img src="dist/images/farewell-329_640.jpg" alt="Laptop and designer" />
      </picture>
    </div>
  );
};

export default IndexPage;
