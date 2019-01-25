import * as React from "react";
//import components
import { Weather } from "../weather/weather";
import FriendForm from "../friendForm/friendFormHook";
import MapComponent from "../map/maphook";
//import helper functions
import { locationServices } from "../../redux/services/index";
import { HF } from "../../helpers/index";
//import styles
import * as styles from "./friend.module.scss";
//redux imports
import { connect } from "react-redux";
import { friendActions } from "../../redux/actions/index";
const { useState, useEffect } = React;
const FriendComponent = ({ Friend, changeActive, isActive, weatherTest }) => {
    const [weather, setWeather] = useState(weatherTest || undefined);
    useEffect(() => {
        locationServices
            .getWeather(Friend.Location.Latitude, Friend.Location.Longitude)
            .then(result => {
            setWeather(result);
        });
    }, [Friend.Location.Latitude, Friend.Location.Longitude]);
    /*
    const date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    */
    if (isActive === Friend.Id) {
        return (React.createElement("div", null,
            React.createElement(React.Fragment, null,
                React.createElement(FriendForm, { Friend: Friend, initialWeather: weatherTest || weather, edit: true }))));
    }
    else {
        return (React.createElement("div", { id: `Friend${Friend.Id}`, "data-testid": `Friend${Friend.Id}` },
            React.createElement("div", null,
                React.createElement("h3", { className: styles.name }, Friend.Name),
                React.createElement("h4", { className: styles.location }, HF.formatLocation(Friend.Location)),
                weather && (React.createElement("div", null,
                    React.createElement(Weather, { weather: weather, showLabel: false }),
                    React.createElement("button", { className: "btn btn--small", onClick: () => changeActive(Friend.Id) }, "Edit"),
                    React.createElement(MapComponent, { mapKey: Friend.Id, position: {
                            latitude: Friend.Location.Latitude,
                            longitude: Friend.Location.Longitude
                        }, style: styles.map, zoom: 9, weather: weather.weather[0].main }))))));
    }
};
function mapStateToProps(state) {
    return {
        isActive: state.friends.isActive || -1
    };
}
function mapDispatchToProps(dispatch) {
    return {
        changeActive: id => {
            dispatch(friendActions.changeFriendAG(id));
        }
    };
}
const ConnectedFriend = connect(mapStateToProps, mapDispatchToProps)(FriendComponent);
export default ConnectedFriend;
//# sourceMappingURL=friendHook.js.map