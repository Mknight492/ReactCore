import React from "react";
import PropTypes from "prop-types";
import Friend from "../friend/friendHook";
import styles from "./friends.module.scss";
import FriendFormComponent from "../friendForm/friendForm.container";
import { throws } from "assert";
// import Test from "../../components/test/test";
class FriendsComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  componentDidMount() {
    const { loadFriends } = this.props;
    loadFriends();
  }

  render() {
    const { isActive, changeActive } = this.props;
    //const { friendsObj } = this.props;
    //takes the friend obj from redux and iterates over it's keys, generating
    //a Friend component for each. followed by the add new friend component
    return (
      <div className={styles.flexContainer}>
        {this.props.friendsObj &&
          Object.values(this.props.friendsObj).map(el => {
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
          <div className={styles.border}>{/* <Test Id={"AddFriend"} /> */}</div>
        </div>
      </div>
    );
  }
}

export default FriendsComponent;
