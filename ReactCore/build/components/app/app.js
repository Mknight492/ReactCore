"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//routing Imports
const router_1 = require("@reach/router");
//import pages
const navigation_1 = require("components/navigation/navigation");
const index_page_1 = require("../pages/index/index-page");
const notFound_1 = require("../errorPages/notFound/notFound");
//import { IdentityLoginPage } from "../pages/IdentityLogin/identityLogin";
const internalServer_1 = require("../errorPages/internalServer/internalServer");
//import global style
const styles = require("./app.module.scss");
require("./FA");
//import loadable
const MyLoadable_1 = require("../../higherOrderComponents/MyLoadable");
//Redux Imports
const react_redux_1 = require("react-redux");
const configure_store_1 = require("../../redux/store/configure-store");
const WeatherPageLoadable = MyLoadable_1.default({
    loader: () => Promise.resolve().then(() => require("../pages/weather/weather-page")),
    modules: ["../pages/weather/weather-page"],
    webpack: () => [require.resolveWeak("../pages/weather/weather-page")]
});
const App = () => {
    return (React.createElement(react_redux_1.Provider, { store: configure_store_1.default },
        React.createElement(React.Fragment, null,
            React.createElement(navigation_1.default, null),
            React.createElement("h2", null, "test me"),
            React.createElement("div", { className: styles.wrapper },
                React.createElement(router_1.Router, null,
                    React.createElement(index_page_1.default, { path: "/" }),
                    React.createElement(WeatherPageLoadable, { path: "/weather" }),
                    React.createElement(internalServer_1.default, { path: "/500" }),
                    React.createElement(notFound_1.default, { path: "*" }))))));
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
exports.default = App;
//
//hmmvv <Route component={FourZeroFour} />
//# sourceMappingURL=app.js.map