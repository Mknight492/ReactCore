import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Friend from "../friend/friendHook";
import styles from "./friends.module.scss";
import FriendFormComponent from "../friendForm/friendForm.container";
import { throws } from "assert";
import Test from "../../components/test/testhook.tsx";

const FriendsComponent = ({
  loadFriends,
  isActive,
  changeActive,
  friendsObj
}) => {
  //on mounting - load friends
  let loaded = false;
  useEffect(
    () => {
      loadFriends();
      loaded = true;
    },
    [loaded]
  );

  return (
    <div className={styles.flexContainer}>
      {friendsObj &&
        Object.values(friendsObj).map(el => {
          return (
            <div className={styles.flexItem} key={el.id}>
              <div className={styles.border}>
                <Friend
                  key={el.id}
                  name={el.name}
                  latitude={el.location.latitude}
                  longitude={el.location.longitude}
                  location={el.location}
                  locations={[el.location]}
                  Id={el.id}
                  isActive={isActive === el.id}
                  changeActive={changeActive}
                />
              </div>
            </div>
          );
        })}
      <div className={styles.flexItem}>
        <div className={styles.border}>
          <Test Id={"AddFriend"} />
        </div>
      </div>
    </div>
  );
};

export default FriendsComponent;
