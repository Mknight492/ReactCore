import React from "react";

//routing Imports
import { Router } from "@reach/router";
import { history } from "../../helpers";
import { PrivateRoute } from "../privateRoute/privateRoute";
import { Private } from "../privateRoute/private";

//import pages
import Navigation from "../../components/navigation/navigation.container";
import { IndexPage } from "../pages/index/index-page.tsx";
import NotFound from "../errorPages/notFound/notFound";
import { IdentityLoginPage } from "../pages/IdentityLogin/identityLogin";
import ServerErrorPage from "../errorPages/internalServer/internalServer";

//import global style
import styles from "./app.container.scss";
import "./FA";

//import loadable
import MyLoadable from "../../higherOrderComponents/MyLoadable";

const WeatherpageLoadable = MyLoadable({
  loader: () => import("../pages/weather/weather-page.tsx"),
  modules: ["../pages/weather/weather-page.tsx"],
  webpack: () => [require.resolveWeak("../pages/weather/weather-page.tsx")]
});

const IdentitypageLoadable = MyLoadable({
  loader: () => import("../pages/Identity/identity"),
  modules: ["../pages/Identity/identity"],
  webpack: () => [require.resolveWeak("../pages/Identity/identity")]
});

const App = ({ user, LoggedIn }) => {
  return (
    <div>
      <Navigation />
      <div className={styles.wrapper}>
        <Router history={history}>
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
