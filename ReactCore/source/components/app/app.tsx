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
import MyLoadable from "../../higherOrderComponents/MyLoadable";

//redux
//import { connect } from "react-redux";
//import { userActions } from "../../redux/actions/index";
//import { ApplicationUserDto } from "../../models/index";
//Redux Imports
//import { Provider } from "react-redux";
//import { Root } from "../../redux/store/configure-store";

//componet imports

import WeatherPage from "../pages/weather/weather-page";

const WeatherPageLoadable: any = MyLoadable({
  loader: () => import("../pages/weather/weather-page"),
  modules: ["../pages/weather/weather-page"],
  webpack: () => [require.resolveWeak("../pages/weather/weather-page")]
});

const App = () => {
  return (
    <>
      <Navigation />
      <h2>test me...</h2>
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

// const App = () => {
//   return (
//     <div>
//       <h2>Hello TS</h2>
//       <Navigation />
//       <IndexPage path="p" />
//       <ServerErrorPage path="/500" />
//       <NotFound path="*" />
//     </div>
//   );
// };

export default hot(module)(App);

//
//hmmvv <Route component={FourZeroFour} />
