"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const friendHook_1 = require("../friend/friendHook");
const styles = require("./friends.module.scss");
const friendFormHook_1 = require("../../components/friendForm/friendFormHook");
const react_redux_1 = require("react-redux");
const actions_1 = require("../../redux/actions");
const { useEffect } = React;
const FriendsComponent = ({ loadFriends, friendsObj, state }) => {
    //on mounting - load friends
    useEffect(() => {
        loadFriends();
    }, []);
    return (React.createElement("div", { className: styles.flexContainer },
        friendsObj &&
            Object.values(friendsObj).map(Friend => {
                return (React.createElement("div", { className: styles.flexItem, key: Friend.Id },
                    React.createElement("div", { className: styles.border },
                        React.createElement(friendHook_1.default, { Friend: Friend }))));
            }),
        React.createElement("div", { className: styles.flexItem },
            React.createElement("div", { className: styles.border },
                React.createElement(friendFormHook_1.default, { edit: false })))));
};
function mapStateToProps(state) {
    return {
        friendsObj: state.friends.friendsObj,
        state: state
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loadFriends: () => {
            dispatch(actions_1.friendActions.loadFriendAttemptAG());
        }
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FriendsComponent);
//# sourceMappingURL=friendsHook.js.map