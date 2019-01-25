"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_hot_loader_1 = require("react-hot-loader");
//routing Imports
const router_1 = require("@reach/router");
//import pages
const navigation_1 = __importDefault(require("components/navigation/navigation"));
const index_page_1 = __importDefault(require("../pages/index/index-page"));
const notFound_1 = __importDefault(require("../errorPages/notFound/notFound"));
//import { IdentityLoginPage } from "../pages/IdentityLogin/identityLogin";
const internalServer_1 = __importDefault(require("../errorPages/internalServer/internalServer"));
//import global style
const styles = __importStar(require("./app.module.scss"));
require("./FA");
//import loadable
const MyLoadable_1 = __importDefault(require("../../higherOrderComponents/MyLoadable"));
const WeatherPageLoadable = MyLoadable_1.default({
    loader: () => Promise.resolve().then(() => __importStar(require("../pages/weather/weather-page"))),
    modules: ["../pages/weather/weather-page"],
    webpack: () => [require.resolveWeak("../pages/weather/weather-page")]
});
const App = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(navigation_1.default, null),
        React.createElement("h2", null, "test me..."),
        React.createElement("div", { className: styles.wrapper },
            React.createElement(router_1.Router, null,
                React.createElement(index_page_1.default, { path: "/" }),
                React.createElement(WeatherPageLoadable, { path: "/weather" }),
                React.createElement(internalServer_1.default, { path: "/500" }),
                React.createElement(notFound_1.default, { path: "*" })))));
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
exports.default = react_hot_loader_1.hot(module)(App);
//
//hmmvv <Route component={FourZeroFour} />
//# sourceMappingURL=app.js.map