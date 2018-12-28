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
import OutsideClick from "../../higherOrderComponents/OutsideClick";

class FriendComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.ref = React.createRef();
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

  render() {
    const { weather, locations } = this.state;
    const {
      latitude,
      longitude,
      changeActive,
      Id,
      isActive,
      name,
      location
    } = this.props;
    const date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const FriendFormClick = OutsideClick(FriendForm, this.props.changeActive);
    //returns a div which is eith populated with the freind data or the edit friend data.
    //these need to be refactored into their own components for simplicity however.
    return (
      <div>
        {isActive === Id ? (
          <>
            <FriendFormClick
              name={name}
              weather={weather}
              location={location}
              locations={locations}
              edit={true}
              latitude={latitude}
              longitude={longitude}
              Id={Id}
            />
          </>
        ) : (
          <div>
            <h3 className={styles.name}> {name}</h3>
            <h4 className={styles.location}> {location} </h4>
            {weather && (
              <div className={styles.weather}>
                <h4>
                  {" "}
                  {weather.main.temp} &deg;C, {weather.weather[0].main},
                  {weather.weather[0].description}
                  {date}
                </h4>
                <button
                  className={"btn btn--small"}
                  onClick={() => changeActive(Id)}
                >
                  Edit
                </button>
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
        )}
      </div>
    );
  }
}

FriendComponent.propTypes = {
  //testString: PropTypes.string.isRequired
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
