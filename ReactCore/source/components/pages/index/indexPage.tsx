import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { Test2 } from "../../test/test2";
import { Test3 } from "../../test/test3";
import { userActions } from "../../../redux/actions";

import TypeAhead from "components/typeAhead/typeAhead";
import { LocationArrayMock1 } from "test/mocks";

//styles
import * as styles from "./indexPage.module.scss";
import cx from "classnames";
import "./indexPage.scss";

const { useState } = React;

interface IProps {
  path: string;
}

const IndexPage: React.SFC<IProps> = props => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const loadHandler = () => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 0);
  };

  //debugger;
  console.log(imageLoaded);
  let imageStyle = cx("img-small", { loaded: imageLoaded });

  return (
    <div className="background">
      {/* <div className={styles.background}>
        <img srcSet="dist/images/farewell-329_640.jpg 640w, dist/images/farewell-785_1280.jpg 1280w, dist/images/farewell-1177_1920.jpg 1920w" />
      </div> */}
      <img
        src="dist/images/farewell-329_640-min.jpg"
        className={imageStyle}
        onLoad={loadHandler}
      />
      <img
        srcSet="dist/images/farewell-329_640.jpg 640w, dist/images/farewell-785_1280.jpg 1280w, dist/images/farewell-1177_1920.jpg 1920w"
        className={imageStyle}
        onLoad={loadHandler}
      />
    </div>
  );
};

export default IndexPage;
