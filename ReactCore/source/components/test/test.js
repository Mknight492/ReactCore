import React from "react";

//style imports
import { Form, Well, FormGroup, Col } from "react-bootstrap";
import { returnInputConfiguration, formUtilityActions } from "../../helpers";
import styles from "../friendForm/friendForm.module.scss";
import classNames from "classnames";

//component imports
import { Weather } from "../weather/weather";
import MapComponent from "../map/maphook";

//redux imports
import { connect } from "react-redux";
import { friendActions } from "../../redux/actions";
import { locationServices } from "../../redux/services";

//helper functions
import Input from "../UI/inputs/weatherInputs";
import { HF, locationHelpers } from "../../helpers";

class TestComponent extends React.Component {
  constructor(...args) {
    super(...args);
    const defualtState = {
      LocationArray: this.props.LocationArray,
      weather: null,
      name: "",
      results: [],
      locations: [],
      latitude: generateRandomNumber(-70, 70),
      longitude: generateRandomNumber(-180, 180),
      selectedLocation: {},
      ownerForm: returnInputConfiguration(),
      isFormValid: false
    };
    if (this.props.edit === true) {
      this.state = {
        LocationArray: this.props.LocationArray,
        weather: this.props.weather,
        name: this.props.name,
        location: this.props.location,
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        selectedLocation: this.props.location,
        ownerForm: returnInputConfiguration([
          this.props.name,
          HF.formatLocation(this.props.location)
        ]),
        isFormValid: false
      };
    } else {
      this.state = defualtState;
    }
  }

  //on loading get the current weather and then display in wweather section and map
  componentDidMount() {
    const { latitude, longitude } = this.state;
    let locationArray;

    if (this.props.edit && this.state.LocationArray.length == 0) {
      locationArray = [this.props.location];
    } else {
      locationArray = this.props.LocationArray;
    }
    locationServices.getWeather(latitude, longitude).then(result => {
      this.setState({ weather: result, locationArray });
    });

    if (this.props.edit && this.state.LocationArray.length == 0) {
      this.setState({ LocationArray: [this.props.location] });
    }
  }

  //function which undate the form
  handleChangeEvent(event, id) {
    const updatedOwnerForm = { ...this.state.ownerForm };
    updatedOwnerForm[
      id
    ] = formUtilityActions.executeValidationAndReturnFormElement(
      event,
      updatedOwnerForm,
      this.state,
      id
    );

    const isFormValid = formUtilityActions.countInvalidElements(
      updatedOwnerForm
    );

    this.setState({ ownerForm: updatedOwnerForm, isFormValid });

    if (id === "Location") {
      this.requestTAValues(event);
    }
  }

  async SubmitForm(event, type) {
    event.preventDefault();

    let { ownerForm } = this.state;
    formUtilityActions.executeFormValidationAndReturnForm(
      ownerForm,
      this.state
    );
    const isFormValid = formUtilityActions.countInvalidElements(ownerForm);

    this.setState({ ownerForm, isFormValid });
    if (isFormValid) {
      let method;
      switch (type) {
        case "ADD":
          method = this.addFriend;
          break;
        case "EDIT":
          method = this.editFriend;
          break;
        case "DELETE":
          method = this.deleteFriend;
          break;
        default:
          break;
      }
      await method(this);
    }
  }

  requestTAValues(event) {
    let searchTerm = event.target.value;

    if (!HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
      //ensures atleast 3 letters before sending TA API call
      this.props.loadLocation(searchTerm, this.props.Id); // dispatches API call
    }
  }

  async selectTAHandler(TAvalue, id) {
    //find the location object that matches  the  TypeAhead value
    const TAData = this.props.LocationArray;
    const matchingLocation = TAData.find(l => HF.formatLocation(l) === TAvalue);

    //get the form obj, update the value and set valid to true (as a location has been selected)
    const { ownerForm } = this.state;
    ownerForm[id].value = TAvalue;
    ownerForm[id].valid = true;

    //update the state to include the selectedId (for API calls )
    this.setState({
      ownerForm,
      selectedLocationId: matchingLocation.geonameid,
      latitude: matchingLocation.latitude,
      longitude: matchingLocation.longitude
    });

    // get the weather for the new location and display it on the map
    const weather = await locationServices.getWeather(
      matchingLocation.latitude,
      matchingLocation.longitude
    );
    this.setState({ weather });
  }

  async addFriend(that) {
    const { loadFriends } = that.props;
    const { selectedLocationId, ownerForm } = that.state;
    await locationServices.addFriend(ownerForm.Name.value, selectedLocationId);
    await loadFriends();
    that.setState({
      ownerForm: returnInputConfiguration([]),
      name: "",
      locations: []
    });
  }

  async editFriend(that) {
    const { loadFriends, Id, changeActive } = that.props;
    const { selectedLocation, ownerForm } = that.state;
    await locationServices.editFriend(
      ownerForm.Name.value,
      selectedLocation,
      Id
    );
    await loadFriends();
    changeActive(null);
  }

  async deleteFriend(that) {
    const { loadFriends, Id } = that.props;
    await locationServices.deleteFriend(Id);
    loadFriends();
  }

  render() {
    const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects(
      this.state.ownerForm
    );
    const { LocationArray } = this.props;
    const { weather, latitude, longitude } = this.state;
    let mapWeather;
    weather ? (mapWeather = weather.weather[0].main) : (mapWeather = null);
    return (
      <Well>
        <Form
          horizontal
          onSubmit={e => {
            this.SubmitForm(e);
          }}
        >
          {/*takes the form obj from state and creates a series of labels/inputs/error messages,
        thus allowing the UI/from to refelct the current state */}
          {formElementsArray.map(element => {
            return (
              <Input
                key={element.id}
                elementType={element.element}
                id={element.id}
                label={element.label}
                type={element.type}
                value={element.value}
                changed={event => this.handleChangeEvent(event, element.id)}
                errorMessage={element.errorMessage}
                invalid={!element.valid}
                shouldValidate={element.validation}
                touched={element.touched}
                blur={event => this.handleChangeEvent(event, element.id)}
                //TypeAhead Specific props
                items={locationHelpers.uniqueTAValues(LocationArray)}
                selectHandler={val => this.selectTAHandler(val, element.id)}
              />
            );
          })}
          <br />
          <Weather weather={this.state.weather} />
          {this.props.edit ? (
            <>
              <button
                className={"btn btn--small"}
                type="submit"
                onClick={e => this.SubmitForm(e, "EDIT")}
              >
                Comfirm Edit
              </button>
              <button
                className={"btn btn--small"}
                onClick={e => this.SubmitForm(e, "DELETE")}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              type="submit"
              className={"btn btn--small"}
              onClick={e => this.SubmitForm(e, "ADD")}
            >
              Add friend
            </button>
          )}
        </Form>
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
      </Well>
    );
  }
}

function mapStateToProps(state) {
  let id = state.friends.isActive;

  return {
    LocationArray: state.friends[id] || state.friends["AddFriend"] || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFriends: () => {
      dispatch(friendActions.loadFriendAttemptAG());
    },
    changeActive: id => {
      dispatch(friendActions.changeFriendAG(id));
    },
    loadLocation: (searchTerm, Id) => {
      dispatch(friendActions.loadLocationTAAttempt(searchTerm, Id));
    }
  };
}

const connectedTestComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);

export default connectedTestComponent;

function generateRandomNumber(min_value, max_value) {
  return Math.random() * (max_value - min_value) + min_value;
}
