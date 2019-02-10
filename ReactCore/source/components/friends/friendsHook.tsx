import * as React from "react";

//import FriendComponent from "../friend/friendHook";
import * as styles from "./friends.module.scss";

import FriendForm from "../../components/friendForm/friendFormHook";

import { connect } from "react-redux";
import { friendActions } from "../../redux/actions";

import { FriendsObj } from "../../models/index";

const { useEffect } = React;

//import loadable
import MyLoadable from "higherOrderComponents/MyLoadable";

import FriendComponent from "components/friend/friendHook";

const FriendComponentLoadable: any = MyLoadable({
  loader: () => import("components/friend/friendHook"),
  modules: ["components/friend/friendHook"],
  webpack: () => [require.resolveWeak("components/friend/friendHook")]
});

interface IProps {
  loadFriends: Function;
  friendsObj: FriendsObj;
  state: any;
}

const FriendsComponent: React.FunctionComponent<IProps> = ({
  loadFriends,
  friendsObj,
  state
}) => {
  //on mounting - load friends
  useEffect(() => {
    loadFriends();
  }, []);
  return (
    <div className={styles.flexContainer}>
      {friendsObj &&
        Object.values(friendsObj).map(Friend => {
          return (
            <div className={styles.flexItemContainer} key={Friend.Id}>
              <div className={styles.flexItem}>
                <div className={styles.border}>
                  <FriendComponentLoadable Friend={Friend} />
                </div>
              </div>
            </div>
          );
        })}
      <div className={styles.flexItemContainer}>
        <div className={styles.flexItem}>
          <div className={styles.border}>
            <FriendForm edit={false} />
          </div>
        </div>
      </div>
    </div>
  );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsComponent);
