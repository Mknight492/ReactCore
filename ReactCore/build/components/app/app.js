import * as React from "react";
import { hot } from "react-hot-loader";
//routing Imports
import { Router } from "@reach/router";
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
const WeatherPageLoadable = MyLoadable({
    loader: () => import("../pages/weather/weather-page"),
    modules: ["../pages/weather/weather-page"],
    webpack: () => [require.resolveWeak("../pages/weather/weather-page")]
});
const App = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Navigation, null),
        React.createElement("h2", null, "test me..."),
        React.createElement("div", { className: styles.wrapper },
            React.createElement(Router, null,
                React.createElement(IndexPage, { path: "/" }),
                React.createElement(WeatherPageLoadable, { path: "/weather" }),
                React.createElement(ServerErrorPage, { path: "/500" }),
                React.createElement(NotFound, { path: "*" })))));
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
//# sourceMappingURL=app.js.map