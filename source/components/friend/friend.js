import React from "react";
import PropTypes from "prop-types";
//import styles from "./friend.css";
import FriendForm from "../friendForm/friendForm.container";
import { weatherAPI } from "../../../security";
import LocationTypeAhead from "../locationTypeAhead/locationTypeAhead";
import { locationServices } from "../../redux/services";
import { HF } from "../../helpers";
import WeatherIcon from "../weatherIcon/weatherIcon";
import MapComponent from "../map/map";
import styles from "./friend.module.scss";
import cx from "classnames";

class FriendComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      weather: null,
      name: this.props.name,
      location: this.props.location,
      locations: this.props.locations || [], //array of location objects
      results: [] //array of {label: locationname } objects for the typeahead
    };
  }

  componentDidMount() {
    const { latitude, longitude } = this.props;
    getWeather(latitude, longitude, weatherAPI).then(result => {
      this.setState({ weather: result });
    });
    console.log(styles);
  }

  //new value is passed into form
  changeHandler(event) {
    //value is placed in variable searchTerm
    let searchTerm = event.target.value;
    this.setState({ location: searchTerm });
    if (!HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
      locationServices.getCities(searchTerm).then(result => {
        result = result.slice(0, 5);
        this.setState({ locations: result });
        let names = result.map(location => ({ label: location.name }));
        this.setState({ results: names });
      });
    } else {
      this.setState({ results: [] });
    }
  }

  submitHandler(value) {
    this.setState({ location: value });
  }

  editFriend(event) {
    const { loadFriends, Id } = this.props;
    event.preventDefault();
    const location = this.state.locations.filter(L => {
      return L.name === this.state.location;
    });
    locationServices
      .editFriend(this.state.name, location[0], Id)
      .then(result => {
        loadFriends();
      });
    this.props.changeActive(null);
  }

  deleteFriend(event) {
    const { loadFriends, Id } = this.props;
    event.preventDefault();
    locationServices.deleteFriend(Id).then(result => {
      loadFriends();
    });
  }

  render() {
    const { weather, name, location } = this.state;
    const { latitude, longitude, changeActive, Id, isActive } = this.props;
    const date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    //let containerClass = classNames(styles.container, "flex-col");

    return isActive === Id ? (
      <div className={"placeholder"}>
        <input
          defaultValue={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <LocationTypeAhead
          changeHandler={e => this.changeHandler(e)}
          submitHandler={val => this.submitHandler(val)}
          value={location}
          items={this.state.results}
        />
        <button type="submit" onClick={e => this.editFriend(e)}>
          Comfirm Edit
        </button>
        <button onClick={e => this.deleteFriend(e)}> Delete</button>
      </div>
    ) : (
      <div className={styles.container}>
        <h3> {name}</h3>
        <h4> {location} </h4>
        {weather && (
          <div style={{ paddingBottom: "10px" }}>
            {weather.main.temp}, {weather.weather[0].main},
            {weather.weather[0].description} {isActive}
            {date}
            <button onClick={() => changeActive(Id)}> Edit </button>
            <MapComponent
              mapKey={Id}
              position={{ latitude, longitude }}
              style={styles.map}
              zoom={9}
              weather={weather.weather[0].main}
            />
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
