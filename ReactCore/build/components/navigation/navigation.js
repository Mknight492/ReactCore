import * as React from "react";
import * as styles from "./navigation.module.scss";
import { Link } from "@reach/router";
import { HF } from "../../helpers";
import { userService } from "../../redux/services";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions";
const { useEffect } = React;
const NavigationComponent = ({ user, LoggedIn, getUser }) => {
    let loaded;
    useEffect(() => {
        getUser();
    }, [loaded]);
    return user ? (React.createElement("div", { className: styles.container },
        React.createElement(Link, { to: "/" }, "Home"),
        React.createElement(Link, { to: "/weather" }, " Weather"),
        React.createElement(Link, { to: "/identity" }, " Register "),
        React.createElement(Link, { to: "/identityLogin", onClick: userService.logout },
            " ",
            "Logout",
            " "),
        React.createElement("a", { href: "/Manage/index" }, user.FirstName))) : (React.createElement("div", { className: styles.container },
        React.createElement(Link, { to: "/" }, "Home"),
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
        getUser: () => dispatch(userActions.getUserRequest())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationComponent);
async function getUser() {
    const user = await HF.Appfetch("/api/Authenticate/CheckUser");
    const userJson = await user.json();
    return userJson;
}
//# sourceMappingURL=navigation.js.map