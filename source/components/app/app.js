import React from "react";

//routing Imports
import { Router } from "@reach/router";

//import pages
import Navigation from "../../components/navigation/navigation";
import IndexPage from "../pages/index/index-page.container";
import WeatherPage from "../pages/weather/weather-page.container";
import FourZeroFour from "../pages/four-zero-four/four-zero-four";
import ApiTestPage from "../pages/APITest/apitest.container";

//import global style
import styles from "./app.css";

const App = () => {
  return (
    <div>
      <Navigation />
      <Router>
        <IndexPage path="/" />
        <WeatherPage path="/weather" />
        <ApiTestPage path="/apitest" />
      </Router>
    </div>
  );
};

export default App;
//
//hmmvv <Route component={FourZeroFour} />
