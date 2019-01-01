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
import NotFound from "../errorPages/notFound/notFound";
import { IdentityPage } from "../pages/Identity/identity";
import { IdentityLoginPage } from "../pages/IdentityLogin/identityLogin";
import ServerErrorPage from "../errorPages/internalServer/internalServer";
//import global style
import styles from "./app.scss";
import "./FA";

const App = ({ user, LoggedIn }) => {
  return LoggedIn ? (
    <div>
      <Navigation />
      <Router history={history}>
        <IndexPage path="/" />
        <WeatherPage path="/weather" />
        <IdentityPage path="/identity" />
        <IdentityLoginPage path="/identityLogin" />
        <ServerErrorPage path="/500" />
        <NotFound path="*" />
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

class App2 extends React.Component {
  constructor(...args) {
    super(...args);
    this.stat;
  }

  render() {
    return <div />;
  }
}

export default App;
//
//hmmvv <Route component={FourZeroFour} />
