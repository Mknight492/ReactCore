import * as React from "react";

//style imports
import { Form, Well, FormGroup, Col } from "react-bootstrap";
import { returnInputConfiguration, formUtilityActions } from "../../helpers";
import * as styles from "../friendForm/friendForm.module.scss";
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

//models
import { Friend, WeatherObject, Locations } from "../../models";

const { useState, useEffect } = React;

interface OwnProps {
  Friend: Friend | undefined;
  isActive?: boolean;
  initialWeather?: WeatherObject;
  edit: boolean;
  Id?: any;
}
interface StateProps {
  LocationArrayProps: Locations[];
}
interface DispatchProps {
  changeActive: (Id?: any) => void;
  loadFriends: () => void;
  loadLocation: (searchTerm: string, Id: number) => void;
}
interface State {}

type Props = StateProps & DispatchProps & OwnProps & State;

const TestComponent: React.SFC<Props> = ({
  Friend,
  initialWeather,
  edit,
  loadFriends,
  loadLocation,
  changeActive,
  LocationArrayProps
}) => {
  //if edit = true then the form initial has not Location or Friend
  let initalLocationId, initialLocation, Id;

  if (edit) {
    Id = Friend.Id;
    initialLocation = [Friend.Location];
    initalLocationId = Friend.Location.Geonameid;
  } else {
    Id = -1;
    initialLocation = [];
    initalLocationId = null;
  }

  ///FORM
  const initalForm = edit
    ? returnInputConfiguration([
        Friend.Name,
        HF.formatLocation(Friend.Location)
      ])
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
  ] = useWeather(initialWeather, 0, 0);
  let mapWeather = weather ? weather.weather[0].main : null;

  //SELECTED LOCATION
  const [selectedLocationId, setselectedLocationId] = useState(
    initalLocationId
  );

  //Typeahead Location Array

  // const [LocationArray, setlocationArray] = useState(
  //   LocationArrayProps || initialLocation
  // );
  const [LocationArray, setlocationArray] = useState(
    LocationArrayProps || initialLocation
  );
  useEffect(
    () => {
      setlocationArray(LocationArrayProps || initialLocation || []);
    },
    [LocationArrayProps, initialLocation]
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

    setlatitude(matchingLocation.Latitude);
    setlongitude(matchingLocation.Longitude);
    setselectedLocationId(matchingLocation.Geonameid);
    //update the state to include the selectedId (for API calls )

    // get the weather for the new location and display it on the map
    const weather = await locationServices.getWeather(
      matchingLocation.Latitude,
      matchingLocation.Longitude
    );
    setWeather(weather);
  }

  async function addFriend() {
    await locationServices.addFriend(ownerForm.Name.value, selectedLocationId);
    await loadFriends();
    //setownerForm(returnInputConfiguration([]));
  }

  async function editFriend() {
    await locationServices.editFriend(
      ownerForm.Name.value,
      selectedLocationId,
      Friend.Id
    );
    await loadFriends();
    changeActive();
  }

  async function deleteFriend() {
    await locationServices.deleteFriend(Friend.Id);
    loadFriends();
  }

  return (
    <Well>
      <Form horizontal>
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
        <Weather weather={weather} showLabel={false} />
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
    LocationArrayProps: state.friends[id] || state.friends[-1] || undefined
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

const connectedTestComponent = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);

export default connectedTestComponent;

////customHook

function useWeather(
  initialWeather,
  initialLatitude: number,
  initialLongitude: number
) {
  const [weather, setWeather] = useState(initialWeather);
  //LOCATION
  const [latitude, setlatitude] = useState(
    initialLatitude || HF.generateRandomNumber(-70, 70)
  );
  const [longitude, setlongitude] = useState(
    initialLongitude || HF.generateRandomNumber(-180, 180)
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

function useLocation(LocationArrayProps, initialLocation) {
  const [LocationArray, setlocationArray] = useState(
    LocationArrayProps || initialLocation
  );
  useEffect(
    () => {
      setlocationArray(LocationArrayProps || initialLocation || []);
    },
    [LocationArrayProps, initialLocation]
  );

  return [LocationArray];
}
