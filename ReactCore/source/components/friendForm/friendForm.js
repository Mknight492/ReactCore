import React from "react";
import PropTypes from "prop-types";
import styles from "./friendForm.module.scss";
import "./friendForm.scss";
import Autocomplete from "react-autocomplete";
import { locationServices } from "../../redux/services";
import { HF } from "../../helpers";
import MapComponent from "../map/map";

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
        longitude: this.props.longitude,
        selectedLocation: this.props.location
      };
    } else {
      this.state = {
        weather: null,
        locationTypeAhead: "",
        name: "",
        results: [],
        locations: [],
        latitude: generateRandomNumber(-70, 70),
        longitude: generateRandomNumber(-180, 180),
        selectedLocation: {}
      };
    }
  }

  componentDidMount() {
    const { latitude, longitude } = this.state;
    locationServices.getWeather(latitude, longitude).then(result => {
      this.setState({ weather: result });
    });
  }

  getTALocations() {
    const { friendsState, Id } = this.props;
    return friendsState[Id] || [];
  }

  changeHandler(event) {
    let searchTerm = event.target.value;
    this.setState({ locationTypeAhead: searchTerm });

    if (!HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
      //ensures atleast 3 letters before sending TA API call
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

  async selectHandler(TAvalue) {
    //this.setState({ locationTypeAhead: TAvalue });
    const TAData = this.getTALocations();
    const matchingLocation = TAData.find(l => HF.formatLocation(l) === TAvalue);
    this.setState({
      locationTypeAhead: TAvalue,
      selectedLocation: matchingLocation,
      latitude: matchingLocation.latitude,
      longitude: matchingLocation.longitude
    });
    const weather = await locationServices.getWeather(
      matchingLocation.latitude,
      matchingLocation.longitude
    );
    this.setState({ weather });
  }

  async submitHandler(event) {
    event.preventDefault(); // stop form being submitted
    const { loadFriends } = this.props;
    const { name, selectedLocation } = this.state;
    const LocationId = selectedLocation.geonameid;
    await locationServices.addFriend(name, LocationId);
    loadFriends();
    this.setState({ locationTypeAhead: "", name: "" });
  }

  async editFriend(event) {
    event.preventDefault();
    const { loadFriends, Id, changeActive } = this.props;
    const { name, selectedLocation } = this.state;
    await locationServices.editFriend(name, selectedLocation, Id);
    await loadFriends();
    changeActive();
  }

  async deleteFriend(event) {
    const { loadFriends, Id } = this.props;
    event.preventDefault();
    await locationServices.deleteFriend(Id);
    loadFriends();
  }

  //const { testString } = this.props;
  render() {
    const { weather, latitude, longitude } = this.state;
    const { isActive } = this.props;
    const TAData = this.getTALocations();
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
              Name: {isActive}
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
                getItemValue={item => HF.formatLocation(item)}
                items={TAData.slice(0, 5)}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white"
                    }}
                    className="typeAheadComponent"
                  >
                    {HF.formatLocation(item)}
                  </div>
                )}
                value={this.state.locationTypeAhead}
                onChange={e => this.changeHandler(e)}
                onSelect={val => this.selectHandler(val)}
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
          zoom={9}
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
/*
export default OutsideClick(FriendFormComponent, function() {
  console.log("outside click");
});
*/
//async function kept her instead of in redux as it only effects local state - not global app state.

function generateRandomNumber(min_value, max_value) {
  return Math.random() * (max_value - min_value) + min_value;
}
