import * as React from "react";
import FriendComponent from "../friend/friendHook";
import * as styles from "./friends.module.scss";
import FriendForm from "../../components/friendForm/friendFormHook";
import { connect } from "react-redux";
import { friendActions } from "../../redux/actions";
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
                        React.createElement(FriendComponent, { Friend: Friend }))));
            }),
        React.createElement("div", { className: styles.flexItem },
            React.createElement("div", { className: styles.border },
                React.createElement(FriendForm, { edit: false })))));
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
            dispatch(friendActions.loadFriendAttemptAG());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendsComponent);
//# sourceMappingURL=friendsHook.js.map