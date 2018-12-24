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
    this.state = {
      weather: null,
      locationTypeAhead: "",
      name: "",
      results: [],
      Locations: [],
      latitude: generateRandomNumber(-70, 70),
      longitude: generateRandomNumber(-180, 180)
    };
  }

  componentDidMount() {
    const { latitude, longitude } = this.state;
    locationServices
      .getWeather(latitude, longitude, weatherAPI)
      .then(result => {
        this.setState({ weather: result });
        console.log(result);
      });
  }

  changeHandler(event) {
    console.log(styles.container);
    let searchTerm = event.target.value;
    this.setState({ locationTypeAhead: searchTerm });
    if (!HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
      locationServices.getCities(event.target.value).then(result => {
        result = result.slice(0, 5);
        this.setState({ Locations: result });
        let names = result.map(location => ({ label: location.name }));
        this.setState({ results: names });
      });
    } else {
      this.setState({ results: [] });
    }
  }

  submitHandler(event) {
    const { loadFriends } = this.props;
    event.preventDefault();
    const location = this.state.Locations.filter(L => {
      return L.name === this.state.locationTypeAhead;
    });
    locationServices.submitForm(this.state.name, location[0]).then(result => {
      loadFriends();
      this.setState({ locationTypeAhead: "", name: "" });
    });
  }

  //const { testString } = this.props;
  render() {
    const { weather } = this.state;
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
                getItemValue={item => item.label}
                items={[...this.state.results]}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white"
                    }}
                  >
                    {item.label}
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
          <button type="submit" className={"btn btn--small"}>
            Add friend
          </button>
          <MapComponent
            mapKey={"addNew"}
            position={{
              latitude: generateRandomNumber(-70, 70),
              longitude: generateRandomNumber(-180, 180)
            }}
            style={styles.map}
            zoom={3}
            weather={"Query"}
          />
        </form>
      </div>
    );
  }
}

FriendFormComponent.propTypes = {};

export default FriendFormComponent;

//async function kept her instead of in redux as it only effects local state - not global app state.

function generateRandomNumber(min_value, max_value) {
  return Math.random() * (max_value - min_value) + min_value;
}
