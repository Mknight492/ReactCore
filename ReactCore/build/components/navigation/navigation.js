"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles = require("./navigation.module.scss");
const router_1 = require("@reach/router");
const helpers_1 = require("../../helpers");
const services_1 = require("../../redux/services");
const react_redux_1 = require("react-redux");
const actions_1 = require("../../redux/actions");
const { useEffect } = React;
const NavigationComponent = ({ user, LoggedIn, getUser }) => {
    let loaded;
    useEffect(() => {
        getUser();
    }, [loaded]);
    return user ? (React.createElement("div", { className: styles.container },
        React.createElement(router_1.Link, { to: "/" }, "Home"),
        React.createElement(router_1.Link, { to: "/weather" }, " Weather"),
        React.createElement(router_1.Link, { to: "/identity" }, " Register "),
        React.createElement(router_1.Link, { to: "/identityLogin", onClick: services_1.userService.logout },
            " ",
            "Logout",
            " "),
        React.createElement("a", { href: "/Manage/index" }, user.FirstName))) : (React.createElement("div", { className: styles.container },
        React.createElement(router_1.Link, { to: "/" }, "Home"),
        React.createElement("a", { href: "/Account/register" }, " Register "),
        React.createElement("a", { href: "/Account/login" }, " Login ")));
};
function mapStateToProps(state) {
    return {
        user: state.users.user,
        LoggedIn: state.users.LoggedIn
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(actions_1.userActions.getUserRequest())
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NavigationComponent);
async function getUser() {
    const user = await helpers_1.HF.Appfetch("/api/Authenticate/CheckUser");
    const userJson = await user.json();
    return userJson;
}
//# sourceMappingURL=navigation.js.map