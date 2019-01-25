import * as React from "react";
import Friends from "../../friends/friendsHook";
//helper functions
import { HF } from "../../../helpers";
//redux imports
import { connect } from "react-redux";
import { positionSuccessAction, performWeatherSearch } from "../../../redux/actions/weatherActions";
const WeatherPage = () => {
    return (React.createElement("div", { "data-testid": "weatherPage" },
        React.createElement("button", { onClick: () => HF.AppAxios({ url: "api/Authenticate/Throw500" }) }, "throw5000"),
        React.createElement("button", { onClick: () => HF.AppAxios({ url: "api/Authenticate/Throw400" }) }, "throw400"),
        React.createElement(Friends, null)));
};
const mapStateToProps = state => ({
    position: state.weather.currentPosition,
    locationWeather: state.weather.locationWeather
});
const mapDispatchToProps = dispatch => ({
    dispatchUpdatedPosition: position => {
        dispatch(positionSuccessAction(position));
        dispatch(performWeatherSearch(position));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
//# sourceMappingURL=weather-page.js.map