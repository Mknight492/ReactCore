import * as React from "react";

//routing Imports
import { Router } from "@reach/router";
import { history } from "../../helpers/index";
import { PrivateRoute } from "../privateRoute/privateRoute";
import { Private } from "../privateRoute/private";

//import pages
import Navigation from "../../components/navigation/navigation.container";
import IndexPage from "../pages/index/index-page";
import NotFound from "../errorPages/notFound/notFound";
import { IdentityLoginPage } from "../pages/IdentityLogin/identityLogin";
import ServerErrorPage from "../errorPages/internalServer/internalServer";

//import global style
import * as styles from "./app.module.scss";
import "./FA";

//import loadable
import MyLoadable from "../../higherOrderComponents/MyLoadable";

//redux
import { connect } from "react-redux";
import { userActions } from "../../redux/actions/index";
import { ApplicationUserDto } from "../../models/index";

const WeatherpageLoadable = MyLoadable({
  loader: () => import("../pages/weather/weather-page"),
  modules: ["../pages/weather/weather-page"],
  webpack: () => [require.resolveWeak("../pages/weather/weather-page")]
});

const IdentitypageLoadable = MyLoadable({
  loader: () => import("../pages/Identity/identity"),
  modules: ["../pages/Identity/identity"],
  webpack: () => [require.resolveWeak("../pages/Identity/identity")]
});

const App: React.SFC = () => {
  return (
    <div>
      <Navigation />
      <div className={styles.wrapper}>
        <Router>
          <IndexPage path="/" />
          <WeatherpageLoadable path="/weather" />
          <IdentitypageLoadable path="/identity" />
          <IdentityLoginPage path="/identityLogin" />
          <ServerErrorPage path="/500" />
          <NotFound path="*" />
        </Router>
      </div>
    </div>
  );
};

export default App;

//
//hmmvv <Route component={FourZeroFour} />
