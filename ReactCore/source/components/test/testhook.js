import React, { useState, useEffect } from "react";

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

function useWeather(initialWeather, initialLatitude, initialLongitude) {
  const [weather, setWeather] = useState(initialWeather);
  //LOCATION
  const [latitude, setlatitude] = useState(
    initialLatitude || generateRandomNumber(-70, 70)
  );
  const [longitude, setlongitude] = useState(
    initialLongitude || generateRandomNumber(-180, 180)
  );
  useEffect(
    () => {
      locationServices.getWeather(latitude, longitude).then(result => {
        setWeather(result);
      });
    },
    [latitude, longitude]
  );

  return [weather, latitude, longitude, setlatitude, setlongitude, setWeather];
}

const TestComponent = ({
  Id,

  initialWeather = null,
  initialName = "",
  initialLatitude,
  initialLongitude,
  location = [],
  LocationArray = [location],
  edit,
  loadFriends,
  loadLocation,
  changeActive
}) => {
  ///FORM

  const initalForm = edit
    ? returnInputConfiguration([initialName, HF.formatLocation(location)])
    : returnInputConfiguration();

  const [ownerForm, setownerForm] = useState(initalForm);

  const [isFormValid, setIsFormValid] = useState(false);

  //WEATHER

  const [
    weather,
    latitude,
    longitude,
    setlatitude,
    setlongitude,
    setWeather
  ] = useWeather(initialWeather);

  //SELECTED LOCATION
  const [selectedLocationId, setselectedLocationId] = useState(
    location.geonameid
  );

  //on loading get the current weather and then display in wweather section and map
  //function which undate the form
  function handleChangeEvent(event, id) {
    const updatedOwnerForm = ownerForm;
    updatedOwnerForm[
      id
    ] = formUtilityActions.executeValidationAndReturnFormElement(
      event,
      updatedOwnerForm,
      LocationArray,
      id
    );

    const isFormValid = formUtilityActions.countInvalidElements(
      updatedOwnerForm
    );

    setIsFormValid(isFormValid);
    setownerForm(updatedOwnerForm);
    if (id === "Location") {
      requestTAValues(event);
    }
  }

  async function SubmitForm(event, type) {
    event.preventDefault();

    const updatedOwnerForm = formUtilityActions.executeFormValidationAndReturnForm(
      ownerForm,
      LocationArray
    );
    const isFormValid = formUtilityActions.countInvalidElements(ownerForm);

    setIsFormValid(isFormValid);
    setownerForm(updatedOwnerForm);

    if (isFormValid) {
      let method;
      switch (type) {
        case "ADD":
          method = addFriend;
          break;
        case "EDIT":
          method = editFriend;
          break;
        case "DELETE":
          method = deleteFriend;
          break;
        default:
          break;
      }
      await method();
    }
  }

  function requestTAValues(event) {
    let searchTerm = event.target.value;

    if (!HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
      //ensures atleast 3 letters before sending TA API call
      loadLocation(searchTerm, Id); // dispatches API call
    }
  }

  async function selectTAHandler(TAvalue, id) {
    //find the location object that matches  the  TypeAhead value

    const matchingLocation = LocationArray.find(
      l => HF.formatLocation(l) === TAvalue
    );

    //get the form obj, update the value and set valid to true (as a location has been selected)
    setownerForm(oldForm => {
      oldForm[id].valid = true;
      oldForm[id].value = TAvalue;
      return oldForm;
    });

    setlatitude(matchingLocation.latitude);
    setlongitude(matchingLocation.longitude);
    setselectedLocationId(matchingLocation.geonameid);
    //update the state to include the selectedId (for API calls )

    // get the weather for the new location and display it on the map
    const weather = await locationServices.getWeather(
      matchingLocation.latitude,
      matchingLocation.longitude
    );
    setWeather(weather);
  }

  async function addFriend() {
    console.log("jook");
    await locationServices.addFriend(ownerForm.Name.value, selectedLocationId);
    await loadFriends();
    //setownerForm(returnInputConfiguration([]));
  }

  async function editFriend() {
    console.log("jook");
    await locationServices.editFriend(
      ownerForm.Name.value,
      selectedLocationId,
      Id
    );
    await loadFriends();
    changeActive(null);
  }

  async function deleteFriend() {
    await locationServices.deleteFriend(Id);
    loadFriends();
  }

  let mapWeather;
  weather ? (mapWeather = weather.weather[0].main) : (mapWeather = null);

  console.log(LocationArray);
  console.log(location);
  return (
    <Well>
      <Form
        horizontal
        onSubmit={e => {
          SubmitForm(e);
        }}
      >
        {/*takes the form obj from state and creates a series of labels/inputs/error messages,
        thus allowing the UI/from to refelct the current state */}
        {formUtilityActions
          .convertStateToArrayOfFormObjects(ownerForm)
          .map(element => {
            return (
              <Input
                key={element.id}
                elementType={element.element}
                id={element.id}
                label={element.label}
                type={element.type}
                value={element.value}
                changed={event => handleChangeEvent(event, element.id)}
                errorMessage={element.errorMessage}
                invalid={!element.valid}
                shouldValidate={element.validation}
                touched={element.touched}
                blur={event => handleChangeEvent(event, element.id)}
                //TypeAhead Specific props
                items={locationHelpers.uniqueTAValues(LocationArray)}
                selectHandler={val => selectTAHandler(val, element.id)}
              />
            );
          })}
        <br />
        <Weather weather={weather} />
        {edit ? (
          <>
            <button
              className={"btn btn--small"}
              type="submit"
              onClick={e => SubmitForm(e, "EDIT")}
            >
              Comfirm Edit
            </button>
            <button
              className={"btn btn--small"}
              onClick={e => SubmitForm(e, "DELETE")}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            type="submit"
            className={"btn btn--small"}
            onClick={e => SubmitForm(e, "ADD")}
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
};

function mapStateToProps(state) {
  let id = state.friends.isActive;

  return {
    LocationArray: state.friends[id] || state.friends["AddFriend"] || undefined
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
