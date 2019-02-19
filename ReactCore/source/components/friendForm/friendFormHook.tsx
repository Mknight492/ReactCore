import * as React from "react";

//style imports
import { Form, FormGroup, Col } from "react-bootstrap";
import { returnInitalFormState, formUtilityActions } from "helpers";
import * as styles from "./friendForm.module.scss";
import * as mapStyles from "../map/friendMap.module.scss";
import classNames from "classnames";

//component imports
import { Weather } from "../weather/weather";
import MapComponent from "../map/maphook";
import TypeAhead from "components/typeAhead/typeAhead";

//redux imports
import { connect } from "react-redux";
import { friendActions } from "redux/actions";
import { locationServices } from "redux/services";

//helper functions
import FormRow from "components/UI/inputs/weatherInputs";
import { HF, locationHelpers } from "helpers";
import { parse, stringify } from "flatted/cjs";

//models
import { Friend, WeatherObject, Locations, EditFriendModel } from "models";

//Custom Hooks
import { HookHelpers } from "customHooks";

import useOnClickOutside from "use-onclickoutside";

const { useState, useEffect } = React;

interface OwnProps {
  Friend?: Friend;
  isActive?: boolean;
  initialWeather?: WeatherObject;
  edit: boolean;
}
interface StateProps {
  LocationArrayProps?: Locations[];
}
interface DispatchProps {
  changeActive: (Id?: any) => void;
  loadFriends: () => void;
  loadLocation: (searchTerm: string, Id: number) => void;
}
interface State {}

type Props = StateProps & DispatchProps & OwnProps & State;

const FriendFormComponent: React.SFC<Props> = ({
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

  if (Friend) {
    Id = Friend.Id;
    initialLocation = [Friend.Location];
    initalLocationId = Friend.Location.Geonameid;
  } else {
    Id = -1;
    initialLocation = [];
    initalLocationId = null;
  }

  // --------------
  // WEATHER STATE
  //---------------

  const [weather, setWeather, coords, setCoords] = useWeather(initialWeather);
  let mapWeather = weather ? weather.weather[0].main : undefined;

  // --------------
  // SELECTED LOCATION STATE
  //---------------

  const [selectedLocationId, setselectedLocationId] = useState(
    initalLocationId
  );
  const [selectedLocation, setselectedLocation] = useState(initialLocation[0]);

  const [initialLoad, setInitialLoad] = useState(!edit);
  if (initialLoad) {
    setInitialLoad(false);
    locationServices.getRandom().then(result => {
      setCoords({
        latitude: result.data[0].Latitude,
        longitude: result.data[0].Longitude
      });
    });
  }

  // --------------
  // LOCATIONS STATE
  //---------------

  const [LocationArray] = useLocation(LocationArrayProps, initialLocation);

  // --------------
  // FORM STATE
  //---------------

  const initalForm = Friend
    ? returnInitalFormState([Friend.Name, HF.formatLocation(Friend.Location)])
    : returnInitalFormState();
  const [ownerForm, setownerForm] = useState(initalForm);

  const [isFormValid, setIsFormValid] = useState(true);

  // --------------
  // OUTSIDECLICK
  //---------------
  const componentRef = React.useRef(null as any);
  const formRef = React.useRef(null as any);
  //will reset the redux state of the currently active form to -1 (the default for the adding a new friend form)
  const OnOutsideClickFunction = () => {
    changeActive(Id);
  };

  if (edit) useOnClickOutside(componentRef, OnOutsideClickFunction);

  // --------------
  // FORM VALIDATION
  //---------------

  function validateFormAndUpdateState(id?: string): boolean {
    //run the form through validation
    //if passed an id then make that element as touched
    //(i.e comming from an input field handler)
    if (id) {
      ownerForm.formRows[id].touched = true;
    }

    let updatedForm = formUtilityActions.executeFormValidationAndReturnForm(
      ownerForm,
      LocationArray
    );
    //update forms state
    setownerForm(updatedForm);

    //then check if form is valid and update tthe state to reflect this.
    const isFormValid = formUtilityActions.checkIfFormValid(updatedForm);
    setIsFormValid(isFormValid);
    return isFormValid;
  }

  //on loading get the current weather and then display in wweather section and map
  //function which undate the form
  function handleChangeEvent(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    //NB directly mutating nested state here
    //but by calling validate form and update state after this state is appropriatly updated
    ownerForm.formRows[id].touched = true;
    ownerForm.formRows[id].value = event.target.value;
    validateFormAndUpdateState();

    if (id === "Location") {
      requestTAValues(event);
    }
  }

  function requestTAValues(event: React.ChangeEvent<HTMLInputElement>) {
    let searchTerm = event.target.value;

    if (!HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
      //ensures atleast 3 letters before sending TA API call
      loadLocation(searchTerm, Id); // dispatches API call
    }
  }

  async function selectTAHandler(location: Locations, id: string) {
    //fist update the form
    //NB directly mutating nested state here
    //but by calling validate form and update state after this state is appropriatly updated

    ownerForm.formRows[id].value = HF.formatLocation(location);
    ownerForm.formRows[id].touched = true;
    validateFormAndUpdateState();

    setCoords({
      latitude: location.Latitude,
      longitude: location.Longitude
    });

    //update the state to include the selectedlocation and Id (for API calls )
    setselectedLocationId(location.Geonameid);
    setselectedLocation(location);

    // get the weather for the new location and display it on the map
    const weather = await locationServices.getWeather(
      location.Latitude,
      location.Longitude
    );
    setWeather(weather);
  }

  // --------------
  // FRIEND CRUD ACTIONS
  //---------------

  async function SubmitForm(event: React.MouseEvent<HTMLButtonElement>, type) {
    event.preventDefault();

    setownerForm(ownerForm => {
      Object.keys(ownerForm.formRows).map(key => {
        //map over each value in the formObj.
        //turn touched to true add error message
        const element = ownerForm.formRows[key];
        element.touched = true;
      });
      return ownerForm;
    });
    const isFormValid = validateFormAndUpdateState();

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

  async function addFriend() {
    await locationServices.addFriend(
      ownerForm.formRows.Name.value,
      selectedLocationId
    );
    await loadFriends();
    setownerForm(returnInitalFormState([]));
  }

  async function editFriend() {
    if (Friend) {
      let EditedFriend: Friend = {
        Name: ownerForm.formRows.Name.value,
        LocationId: selectedLocationId,
        Id: Friend.Id,
        UserId: Friend.UserId,
        Location: selectedLocation
      };

      await locationServices.editFriend(EditedFriend);
      changeActive();
    }
  }

  async function deleteFriend() {
    if (Friend) {
      await locationServices.deleteFriend(Friend.Id);
      changeActive();
    }
  }

  // --------------
  // DYNAMIC STYLES
  //---------------

  const OnlyActiveOnValidForm = classNames("btn", "btn--small", {
    "btn--disabled": !isFormValid
  });

  const regularFormButtonStyle = classNames(
    "btn",
    "btn--small",
    styles.formButton
  );

  return (
    <div
      ref={componentRef}
      data-testid="friendFormComponent"
      id={`friendFormComponent${Id}`}
      className={styles.container}
    >
      <form>
        {/*takes the form obj from state and creates a series of labels/inputs/error messages,
        thus allowing the UI/from to refelct the current state */}
        {formUtilityActions
          .convertStateToArrayOfFormObjects(ownerForm)
          .map(formRow => {
            return (
              //map over the form state
              //pass the each row its props
              // including event handlers to pass state back to friendform component

              <FormRow
                key={formRow.id + "row"}
                formRow={formRow}
                changed={event => handleChangeEvent(event, formRow.id)}
                blur={validateFormAndUpdateState}
                //TypeAhead Specific props
                items={locationHelpers.uniqueTAValues(LocationArray || [])}
                selectHandler={val => selectTAHandler(val, formRow.id)}
                locations={LocationArray}
                formRef={formRef}
                setFormState={setownerForm}
              />
            );
          })}
        {weather && <Weather weather={weather} showLabel={!edit} />}
        {edit ? (
          <>
            <button
              className={OnlyActiveOnValidForm}
              type="submit"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                SubmitForm(e, "EDIT")
              }
            >
              Confirm Edit
            </button>
            <button
              className={regularFormButtonStyle}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                SubmitForm(e, "DELETE")
              }
            >
              Delete
            </button>
          </>
        ) : (
          <button
            type="submit"
            className={regularFormButtonStyle}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              SubmitForm(e, "ADD")
            }
          >
            Add friend
          </button>
        )}
      </form>
      <MapComponent
        mapKey={"addNew"}
        position={coords}
        style={mapStyles.map}
        zoom={9}
        weather={mapWeather}
      />
    </div>
  );
};

function mapStateToProps(state) {
  let id = state.friends.isActive;
  //this is unreliable and needs to be edited
  return {
    LocationArrayProps: state.friends[id] || undefined
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFriends: () => {
      dispatch(friendActions.loadFriendAttemptAG());
    },
    changeActive: id => {
      dispatch(friendActions.changeFriendAG(-1));
      dispatch(friendActions.resetFriendsTAValues(id));
    },
    loadLocation: (searchTerm, Id) => {
      dispatch(friendActions.loadLocationTAAttempt(searchTerm, Id));
    }
  };
}

const connectedFriendFormComponent = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(FriendFormComponent);

export default connectedFriendFormComponent;

////customHooks

interface coords {
  latitude: number;
  longitude: number;
}

function useWeather(
  initialWeather?: WeatherObject
): [
  WeatherObject | undefined,
  React.Dispatch<React.SetStateAction<WeatherObject | undefined>>,
  coords,
  React.Dispatch<React.SetStateAction<coords>>
] {
  let shouldWeatherLoad = false;

  //either take the inital location from the
  //weather object or generate a random number
  let initialLatitude = initialWeather
    ? initialWeather.coord.lat
    : HF.generateRandomNumber(-70, 70);
  let initialLongitude = initialWeather
    ? initialWeather.coord.lon
    : HF.generateRandomNumber(-180, 180);

  let initialCordinates = {
    latitude: initialLatitude,
    longitude: initialLongitude
  };

  //generate the stae variables
  const [weather, setWeather] = useState(initialWeather);
  //const [latitude, setlatitude] = useState(initialLatitude);
  //const [longitude, setlongitude] = useState(initialLongitude);
  const [coords, setCoords] = useState(initialCordinates);
  //every time the latitude or longitude  changes - fetch a new weather object
  // but only do this if not inital weather was supplied or irs, not the
  // first time this function is called

  useEffect(() => {
    if (!initialWeather || shouldWeatherLoad) {
      locationServices
        .getWeather(coords.latitude, coords.longitude)
        .then(result => {
          setWeather(result);
        });
    } else {
      shouldWeatherLoad = true;
    }
  }, [coords.latitude, coords.longitude]);

  return [weather, setWeather, coords, setCoords];
}

function useLocation(LocationArrayProps, initialLocation) {
  //set the locationArray to be the LocationArrayProps
  //or default to the inital Location
  const [LocationArray, setlocationArray] = useState(
    LocationArrayProps || initialLocation
  );
  useEffect(() => {
    setlocationArray(LocationArrayProps || initialLocation || []);
  }, [LocationArrayProps]);

  return [LocationArray];
}
