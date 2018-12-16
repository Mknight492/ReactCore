import React from "react";
import PropTypes from "prop-types";
import styles from "./friend.css";
import axios from "axios";
import { weatherAPI } from "../../../security";

class FriendComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      weather: null
    };
  }

  componentDidMount() {
    const { name, latitude, longitude } = this.props;
    getWeather(latitude, longitude, weatherAPI).then(result => {
      console.log(result);
      this.setState({ weather: result });
    });
  }

  render() {
    const { weather } = this.state;
    const { name, latitude, longitude, location } = this.props;
    return (
      <div className="friend">
        {name} , {latitude}, {longitude}, {location}
        {weather && (
          <div>
            {" "}
            {weather.main.temp}, {weather.weather[0].main},{" "}
            {weather.weather[0].description}
          </div>
        )}
      </div>
    );
  }
}

FriendComponent.propTypes = {
  testString: PropTypes.string.isRequired
};

export default FriendComponent;

async function getWeather(latitude, longitude, APIkey) {
  try {
    const APIdata = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`
    );
    const APIdataParsed = await APIdata.json();
    return APIdataParsed;
  } catch (e) {
    return e;
  }
}
