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
const friendHook_1 = __importDefault(require("../friend/friendHook"));
const styles = __importStar(require("./friends.module.scss"));
const friendFormHook_1 = __importDefault(require("../../components/friendForm/friendFormHook"));
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