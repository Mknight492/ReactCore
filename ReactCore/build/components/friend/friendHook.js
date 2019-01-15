"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var weather_1 = require("../weather/weather");
// @ts-ignore
var testhook_tsx_1 = require("../test/testhook.tsx");
var maphook_1 = require("../map/maphook");
var OutsideClick_1 = require("../../higherOrderComponents/OutsideClick");
//import helper functions
// @ts-ignore
var services_1 = require("../../redux/services");
var helpers_1 = require("../../helpers");
//import styles
var styles = require("./friend.module.scss");
require("./friend.scss");
//redux imports
var react_redux_1 = require("react-redux");
var actions_1 = require("../../redux/actions");
var useState = React.useState, useEffect = React.useEffect;
var FriendComponent = function (_a) {
    var latitude = _a.latitude, longitude = _a.longitude, changeActive = _a.changeActive, Id = _a.Id, isActive = _a.isActive, name = _a.name, location = _a.location;
    var _b = useState(null), weather = _b[0], setWeather = _b[1];
    useEffect(function () {
        services_1.locationServices.getWeather(latitude, longitude).then(function (result) {
            setWeather(result);
        });
    }, []);
    var date = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
    var ClickTest = OutsideClick_1.default(testhook_tsx_1.default, changeActive);
    return (React.createElement("div", null, isActive ? (React.createElement(React.Fragment, null,
        React.createElement(ClickTest, { initialName: name, initialWeather: weather, location: location, edit: true, initialLatitude: latitude, initialLongitude: longitude, 
            //
            Id: Id, isActive: isActive }))) : (React.createElement("div", null,
        React.createElement("h3", { className: styles.name },
            " ",
            name),
        React.createElement("h4", { className: styles.location },
            " ",
            helpers_1.HF.formatLocation(location),
            " "),
        weather && (React.createElement("div", null,
            React.createElement(weather_1.Weather, { weather: weather, showLabel: false }),
            React.createElement("button", { className: "btn btn--small", onClick: function () { return changeActive(Id); } }, "Edit"),
            React.createElement(maphook_1.default, { mapKey: Id, position: { latitude: latitude, longitude: longitude }, style: styles.map, zoom: 9, weather: weather.weather[0].main })))))));
};
function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        changeActive: function (id) {
            dispatch(actions_1.friendActions.changeFriendAG(id));
        },
        loadFriends: function () {
            dispatch(actions_1.friendActions.loadFriendAttemptAG());
        }
    };
}
var ConnectedFriend = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FriendComponent);
exports.default = ConnectedFriend;
//# sourceMappingURL=friendHook.js.map