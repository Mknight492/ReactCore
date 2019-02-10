import * as React from "react";
import { hot } from "react-hot-loader";

//routing Imports
import { Router } from "@reach/router";
//import { history } from "../../helpers/index";
//import { PrivateRoute } from "../privateRoute/privateRoute";
//import { Private } from "../privateRoute/private";

//import pages
import Navigation from "components/navigation/navigation";
import IndexPage from "../pages/index/index-page";
import NotFound from "../errorPages/notFound/notFound";
//import { IdentityLoginPage } from "../pages/IdentityLogin/identityLogin";
import ServerErrorPage from "../errorPages/internalServer/internalServer";

//import global style
import * as styles from "./app.module.scss";
import "./FA";

//import loadable
import MyLoadable from "higherOrderComponents/MyLoadable";

import WeatherPage from "../pages/weather/weather-page";

const WeatherPageLoadable: any = MyLoadable({
  loader: () => import("../pages/weather/weather-page"),
  modules: ["../pages/weather/weather-page"],
  webpack: () => [require.resolveWeak("../pages/weather/weather-page")]
});

WeatherPageLoadable.preload();

const App = () => {
  return (
    <>
      <Navigation />
      <div className={styles.wrapper}>
        <Router>
          <IndexPage path="/" />
          <WeatherPageLoadable path="/weather" />
          <ServerErrorPage path="/500" />
          <NotFound path="*" />
        </Router>
      </div>
    </>
  );
};

export default hot(module)(App);

//
//hmmvv <Route component={FourZeroFour} />
