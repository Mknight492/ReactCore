import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { Test2 } from "../../test/test2";
import { Test3 } from "../../test/test3";
import { userActions } from "../../../redux/actions";

import TypeAhead from "components/typeAhead/typeAhead";
import { LocationArrayMock1 } from "test/mocks";

interface IProps {
  path: string;
}

const IndexPage: React.SFC<IProps> = props => {
  return (
    <div className="large-hero js-waypoint" id="home" data-link="home--link">
      <img src="dist/images/hero--large.jpg" alt="Laptop and designer" />
      <div className="wrapper">
        <div className="large-hero__text-content">
          <h1>
            <span className="large-hero__title">Full-Stack Web Developer</span>
            <span className="large-hero__subtitle">
              Self taught developler based in Wellington, New Zealand
              specializing in performant .Net Core web Apps
            </span>
          </h1>
          <button className="btn btn--margin link" data-link="projects">
            My Projects
          </button>
          <button className="btn btn--margin link" data-link="contact">
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
