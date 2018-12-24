import React from "react";
import PropTypes from "prop-types";
import Friend from "../friend/friend.container";
import styles from "./friends.module.scss";
import FriendFormComponent from "../friendForm/friendForm.container";
class FriendsComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      friendsObj: this.props.friendsObj
    };
  }
  componentDidMount() {
    const { loadFriends } = this.props;
    loadFriends();
  }
  render() {
    const { friendsObj } = this.props;
    //takes the friend obj from redux and iterates over it's keys, generating
    //a Friend component for each. followed by the add new friend component
    return (
      <div className={styles.flexContainer}>
        {friendsObj &&
          Object.values(friendsObj).map(el => {
            return (
              <div className={styles.flexItem} key={el.id}>
                <div className={styles.border}>
                  <Friend
                    //key={el.id}
                    name={el.name}
                    latitude={el.location.latitude}
                    longitude={el.location.longitude}
                    location={el.location.name}
                    locations={[el.location]}
                    Id={el.id}
                  />
                </div>
              </div>
            );
          })}
        <div className={styles.flexItem}>
          <div className={styles.border}>
            <FriendFormComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsComponent;
