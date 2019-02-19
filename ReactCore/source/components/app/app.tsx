import * as React from "react";
import { hot } from "react-hot-loader";

//routing Imports
import { Router } from "@reach/router";
//import { history } from "../../helpers/index";
//import { PrivateRoute } from "../privateRoute/privateRoute";
//import { Private } from "../privateRoute/private";

//import components
import Backdrop from "components/backdrop/backdrop";

//import pages
import Navigation from "components/navigation/navigation";
import IndexPage from "components/pages/index/indexPage";
import Login from "components/pages/login/loginPage";
import RegisterPage from "components/pages/register/registerPage";

import NotFound from "../errorPages/notFound/notFound";
//import { IdentityLoginPage } from "../pages/IdentityLogin/identityLogin";
import ServerErrorPage from "../errorPages/internalServer/internalServer";

//import global style
import * as styles from "./app.module.scss";
import "./FA";

//import loadable
import MyLoadable from "higherOrderComponents/MyLoadable";

const WeatherPageLoadable: any = MyLoadable({
  loader: () => import("components/pages/weather/weather-page"),
  modules: ["components/pages/weather/weather-page"],
  webpack: () => [require.resolveWeak("components/pages/weather/weather-page")]
});
//WeatherPageLoadable.preload();

const wrappedComponent: any = (Component: any) => {
  return () => (
    <div className={styles.wrapper}>
      <Component />
    </div>
  );
};

const WWeatherPageLoadable = wrappedComponent(WeatherPageLoadable);

const App = () => {
  return (
    <div style={{ height: "100%" }}>
      <Navigation />
      <Router>
        <IndexPage path="/" />
        <WWeatherPageLoadable path="/weather" />
        <Login path="/react/login" />
        <RegisterPage path="/react/register" />
        <ServerErrorPage path="/500" />
        <NotFound path="*" />
      </Router>
    </div>
  );
};

export default hot(module)(App);

//
//hmmvv <Route component={FourZeroFour} />
