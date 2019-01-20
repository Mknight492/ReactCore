import * as React from "react";

import FriendComponent from "../friend/friendHook";
import * as styles from "./friends.module.scss";

import FriendForm from "../../components/friendForm/friendFormHook";

import { connect } from "react-redux";
import { friendActions } from "../../redux/actions";

import { FriendsObj } from "../../models/index";

const { useEffect } = React;

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
            <div className={styles.flexItem} key={Friend.Id}>
              <div className={styles.border}>
                <FriendComponent Friend={Friend} />
              </div>
            </div>
          );
        })}
      <div className={styles.flexItem}>
        <div className={styles.border}>
          <FriendForm edit={false} />
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
