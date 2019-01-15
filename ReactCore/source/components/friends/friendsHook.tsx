import * as React from "react";

import FriendComponent from "../friend/friendHook";
import * as styles from "./friends.module.scss";

import Test from "../../components/test/testhook";

import { connect } from "react-redux";
import { friendActions } from "../../redux/actions";

import { FriendsObj } from "../../models/index";

const { useEffect } = React;

interface IProps {
  loadFriends: Function;
  currentlyActive: number;
  changeActive: Function;
  friendsObj: FriendsObj;
}

const FriendsComponent: React.FunctionComponent<IProps> = ({
  loadFriends,
  currentlyActive,
  changeActive,
  friendsObj
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
                <FriendComponent
                  Friend={Friend}
                  isActive={currentlyActive === Friend.Id}
                  changeActive={changeActive}
                />
              </div>
            </div>
          );
        })}
      <div className={styles.flexItem}>
        <div className={styles.border}>
          <Test Id={"AddFriend"} edit={false} />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    friendsObj: state.friends.friendsObj,
    currentlyActive: state.friends.isActive
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFriends: () => {
      dispatch(friendActions.loadFriendAttemptAG());
    },
    changeActive: id => {
      dispatch(friendActions.changeFriendAG(id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsComponent);