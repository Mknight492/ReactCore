import * as React from "react";
import * as styles from "./internalServer.module.scss";
import { connect } from "react-redux";
import { Link } from "@reach/router";
const internalServer = props => {
    return (React.createElement("div", { className: styles.container },
        React.createElement("h2", { className: styles.heading }, "500 SERVER ERROR, CONTACT ADMINISTRATOR!"),
        React.createElement("h3", { className: styles.errorMessage }, props.errorMessage),
        React.createElement(Link, { to: "/", className: styles.link }, "Return Home...")));
};
function mapStateToProps(state) {
    return {
        errorMessage: state.errorHandler.errorMessage
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
const ConnectInternalServer = connect(mapStateToProps, mapDispatchToProps)(internalServer);
export default ConnectInternalServer;
//# sourceMappingURL=internalServer.js.map