import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
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

  let imageStyle = cx("img-small", { loaded: imageLoaded });

  let user;
  let Json = sessionStorage.getItem("user");
  if (Json) {
    user = JSON.parse(Json);
  }
  if (user && user.Id === null) user = null;

  return (
    <>
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
        <div className={styles.textBoxContainer}>
          <h1 className={styles.heading}>
            Keep track of the weather no matter where your friends and family
            are
          </h1>

          {!user && (
            <>
              <a
                className={`btn btn--small ${styles.button}`}
                href={"/Account/login"}
              >
                Login
              </a>
              <a
                className={`btn btn--small ${styles.button}`}
                href={"/Account/register"}
              >
                Register
              </a>
            </>
          )}

          {user && (
            <Link className={`btn btn--small ${styles.button}`} to={"/weather"}>
              See their Weather
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
