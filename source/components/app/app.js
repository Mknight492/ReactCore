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
import ApiTestPage from "../pages/APITest/apitest.container";
import { RegisterPage } from "../pages/register/registerPage";
import { LoginPage } from "../pages/login/loginPage";
import { IdentityPage } from "../pages/Identity/identity";
import { IdentityLoginPage } from "../pages/IdentityLogin/identityLogin";

//import global style
import styles from "./app.css";

const App = () => {
  let user = localStorage.getItem("user");
  return localStorage.getItem("user") ? (
    <div>
      <Navigation />
      <Router history={history}>
        <IndexPage path="/" />
        <WeatherPage path="/weather" />
        <ApiTestPage path="/apitest" />
        <RegisterPage path="/register" />
        <LoginPage path="/login" />
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
        <RegisterPage path="/register" />
        <LoginPage path="/login" />
        <IdentityPage path="/identity" />
        <IdentityLoginPage path="/identityLogin" />
      </Router>
    </div>
  );
};

export default App;
//
//hmmvv <Route component={FourZeroFour} />
