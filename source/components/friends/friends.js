import React from "react";
import PropTypes from "prop-types";
import Friend from "../friend/friend.container";

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
    return (
      <div className="friends">
        {friendsObj &&
          Object.values(friendsObj).map(el => {
            return (
              <Friend
                key={el.id}
                name={el.name}
                latitude={el.latitude}
                longitude={el.longitude}
                location={el.location.name}
                locations={[el.location]}
                Id={el.id}
              />
            );
          })}
      </div>
    );
  }
}

export default FriendsComponent;
