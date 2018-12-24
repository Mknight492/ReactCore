import React from "react";

//routing Imports
import { Router } from "@reach/router";
import { history } from "../../helpers";
import { PrivateRoute } from "../privateRoute/privateRoute";
import { Private } from "../privateRoute/private";

//import pages
import Navigation from "../../components/navigation/navigation.container";
import IndexPage from "../pages/index/index-page.container";
import WeatherPage from "../pages/weather/weather-page.container";
import FourZeroFour from "../pages/four-zero-four/four-zero-four";
import { RegisterPage } from "../pages/register/registerPage";
import { LoginPage } from "../pages/login/loginPage";
import { IdentityPage } from "../pages/Identity/identity";
import { IdentityLoginPage } from "../pages/IdentityLogin/identityLogin";

//import global style
import styles from "./app.scss";

//fontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSunRain,
  faCloudRain,
  faCloudSun,
  faCloud
} from "@fortawesome/free-solid-svg-icons";
//import {faSun} from "@fortawesome/free-brands-svg-icons"
import { faSun } from "@fortawesome/free-regular-svg-icons";

library.add([faCloudRain, faCloudSun, faCloudSunRain, faCloud]);

const App = () => {
  return true ? (
    <div>
      <Navigation />
      <Router history={history}>
        <IndexPage path="/" />
        <WeatherPage path="/weather" />
        <IdentityPage path="/identity" />
        <IdentityLoginPage path="/identityLogin" />
      </Router>
    </div>
  ) : (
    <div>
      <Navigation />
      <Router history={history}>
        <WeatherPage path="/weather" />
        <IndexPage path="/" />
        <IdentityPage path="/identity" />
        <IdentityLoginPage path="/identityLogin" />
      </Router>
    </div>
  );
};

export default App;
//
//hmmvv <Route component={FourZeroFour} />
