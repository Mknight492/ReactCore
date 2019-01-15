import React from "react";
import PropTypes from "prop-types";

//import components
import FriendForm from "../friendForm/friendForm.Outside";
import { Weather } from "../weather/weather";
import Test from "../test/test";
import MapComponent from "../map/map";
import OutsideClick from "../../higherOrderComponents/OutsideClick";

//import helper functions
// @ts-ignore
import { locationServices } from "../../redux/services/index.ts";
import { HF } from "../../helpers";

//import styles
import styles from "./friend.module.scss";
import "./friend.scss";

class FriendComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      weather: null,
      name: this.props.name,
      location: this.props.location
    };
    this.ClickTest = OutsideClick(Test, this.props.changeActive);
  }

  componentDidMount() {
    const { latitude, longitude } = this.props;
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
    const ClickTest = this.ClickTest;
    //const FriendFormClick = OutsideClick(FriendForm, this.props.changeActive);

    //returns a div which is eith populated with the freind data or the edit friend data.
    //these need to be refactored into their own components for simplicity however.
    return (
      <div>
        {isActive ? (
          <>
            <ClickTest
              name={name}
              weather={weather}
              location={location}
              edit={true}
              latitude={latitude}
              longitude={longitude}
              Id={Id}
              isActive={isActive}
            />
          </>
        ) : (
          <div>
            <h3 className={styles.name}> {name}</h3>
            <h4 className={styles.location}> {HF.formatLocation(location)} </h4>
            {weather && (
              <div className={styles.weather}>
                <Weather weather={weather} showLabel={false} />
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
