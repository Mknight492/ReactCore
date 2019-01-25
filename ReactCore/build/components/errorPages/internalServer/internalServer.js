"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styles = __importStar(require("./internalServer.module.scss"));
const react_redux_1 = require("react-redux");
const router_1 = require("@reach/router");
const internalServer = props => {
    return (React.createElement("div", { className: styles.container },
        React.createElement("h2", { className: styles.heading }, "500 SERVER ERROR, CONTACT ADMINISTRATOR!"),
        React.createElement("h3", { className: styles.errorMessage }, props.errorMessage),
        React.createElement(router_1.Link, { to: "/", className: styles.link }, "Return Home...")));
};
function mapStateToProps(state) {
    return {
        errorMessage: state.errorHandler.errorMessage
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
const ConnectInternalServer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(internalServer);
exports.default = ConnectInternalServer;
//# sourceMappingURL=internalServer.js.map