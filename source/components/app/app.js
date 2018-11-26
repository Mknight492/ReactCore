import React from "react";

//routing Imports
import { Route, Switch } from "react-router";

//import components
import Navigation from "../../components/navigation/navigation";
import IndexPage from "../pages/index/index-page.container";
import WeatherPage from "../pages/weather/weather-page.container";
import FourZeroFour from "../pages/four-zero-four/four-zero-four";

export default function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/weather" component={WeatherPage} />
        <Route component={FourZeroFour} />
      </Switch>
    </>
  );
}

//hmmvv
