import React from "react";
import PropTypes from "prop-types";
import styles from "./friendForm.module.scss";
import "./friendForm.scss";
import Autocomplete from "react-autocomplete";
import { locationServices } from "../../redux/services";
import { HF } from "../../helpers";
import MapComponent from "../map/map";
import { cx } from "classnames";
import { weatherAPI } from "../../../security";

class FriendFormComponent extends React.Component {
  constructor(...args) {
    super(...args);

    if (this.props.edit === true) {
      this.state = {
        weather: this.props.weather,
        locationTypeAhead: HF.formatLocation(this.props.location),
        name: this.props.name,
        //results: [{ label: this.props.location }],
        //locations: this.props.locations,
        location: this.props.location,
        latitude: this.props.latitude,
        longitude: this.props.longitude
      };
    } else {
      this.state = {
        weather: null,
        locationTypeAhead: "",
        name: "",
        results: [],
        locations: [],
        latitude: generateRandomNumber(-70, 70),
        longitude: generateRandomNumber(-180, 180)
      };
    }
    const { friendsState, Id } = this.props;
    this.TAData = friendsState[Id] || [];
    console.log(this.TAData);
  }

  componentDidMount() {
    const { latitude, longitude } = this.state;
    locationServices
      .getWeather(latitude, longitude, weatherAPI)
      .then(result => {
        this.setState({ weather: result });
      });
  }

  componentDidUpdate(a, b) {
    console.log(a, b);
  }

  changeHandler(event) {
    let searchTerm = event.target.value;
    this.setState({ locationTypeAhead: searchTerm });

    if (!HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
      this.props.loadLocation(searchTerm, this.props.Id); // dispatches API call
    } else {
      this.setState({ results: [] });
    }
    /*
    if (!HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
      locationServices.getCities(event.target.value).then(result => {
        result = result.slice(0, 5);
        this.setState({ locations: result });
        let names = result.map(location => ({ label: location.name }));
        this.setState({ results: names });
      });
    } else {
      this.setState({ results: [] });
    }
    */
  }

  submitHandler(event) {
    const { loadFriends } = this.props;
    const { friendsState, Id } = this.props;
    const TAData = friendsState[Id] || [];
    event.preventDefault();
    const matchingLocation = TAData.filter(l => {
      return formatLocation(l) === this.state.locationTypeAhead;
    });
    locationServices
      .submitForm(this.state.name, matchingLocation[0])
      .then(result => {
        loadFriends();
        this.setState({ locationTypeAhead: "", name: "" });
      });
  }

  editFriend(event) {
    const { loadFriends, Id } = this.props;
    const { friendsState } = this.props;
    const TAData = friendsState[Id] || [];
    event.preventDefault();
    const location = TAData.filter(L => {
      return formatLocation(L) === this.state.locationTypeAhead;
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

  //const { testString } = this.props;
  render() {
    const { weather, latitude, longitude } = this.state;
    const { friendsState, Id } = this.props;
    const TAData = friendsState[Id] || [];
    let mapWeather;
    weather ? (mapWeather = weather.weather[0].main) : (mapWeather = null);
    return (
      <div>
        <form
          onSubmit={e => {
            this.submitHandler(e);
          }}
        >
          <div>
            <label className={styles.name} htmlFor="name" type="text" id="name">
              Name:
            </label>
            <input
              className={styles.input}
              name="name"
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </div>
          <div>
            <label
              style={{ textAlign: "left" }}
              className={styles.location}
              htmlFor={"location"}
            >
              Location:
            </label>
            <div className={styles.typeAhead}>
              {/*Needs div for custom CSS hook */}
              <Autocomplete
                name="location"
                getItemValue={item => formatLocation(item)}
                items={TAData.slice(0, 5)}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white"
                    }}
                  >
                    {formatLocation(item)}
                  </div>
                )}
                value={this.state.locationTypeAhead}
                onChange={e => this.changeHandler(e)}
                onSelect={val => this.setState({ locationTypeAhead: val })}
                key={1}
                placeholder="damn"
              />
            </div>

            {weather && (
              <div className={styles.weather}>
                <h4 className={styles.weatherLabel}> Weather: </h4>
                <h4 className={styles.weatherData}>
                  {weather.name}
                  {weather.main.temp} &deg;C, {weather.weather[0].main},
                  {weather.weather[0].description}
                </h4>{" "}
              </div>
            )}
          </div>

          {this.props.edit ? (
            <>
              <button
                className={"btn btn--small"}
                type="submit"
                onClick={e => this.editFriend(e)}
              >
                Comfirm Edit
              </button>
              <button
                className={"btn btn--small"}
                onClick={e => this.deleteFriend(e)}
              >
                Delete
              </button>
            </>
          ) : (
            <button type="submit" className={"btn btn--small"}>
              Add friend
            </button>
          )}
        </form>
        <MapComponent
          mapKey={"addNew"}
          position={{
            latitude,
            longitude
          }}
          style={styles.map}
          zoom={3}
          weather={mapWeather}
        />
      </div>
    );
  }
}

FriendFormComponent.propTypes = {
  edit: PropTypes.bool
};

export default FriendFormComponent;

//async function kept her instead of in redux as it only effects local state - not global app state.

function generateRandomNumber(min_value, max_value) {
  return Math.random() * (max_value - min_value) + min_value;
}

const formatLocation = locationObj => {
  return locationObj.name + " " + locationObj.countryCode;
};
