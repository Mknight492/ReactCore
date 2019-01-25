import * as React from "react";
import { returnInitalFormState, formUtilityActions } from "helpers";
import * as styles from "./friendForm.module.scss";
//component imports
import { Weather } from "../weather/weather";
import MapComponent from "../map/maphook";
//redux imports
import { connect } from "react-redux";
import { friendActions } from "redux/actions";
import { locationServices } from "redux/services";
//helper functions
import FormRow from "components/UI/inputs/weatherInputs";
import { HF, locationHelpers } from "helpers";
//Custom Hooks
import { HookHelpers } from "customHooks";
const { useState, useEffect } = React;
const FriendFormComponent = ({ Friend, initialWeather, edit, loadFriends, loadLocation, changeActive, LocationArrayProps }) => {
    //if edit = true then the form initial has not Location or Friend
    let initalLocationId, initialLocation, Id;
    if (Friend) {
        Id = Friend.Id;
        initialLocation = [Friend.Location];
        initalLocationId = Friend.Location.Geonameid;
    }
    else {
        Id = -1;
        initialLocation = [];
        initalLocationId = null;
    }
    ///FORM
    const initalForm = Friend
        ? returnInitalFormState([Friend.Name, HF.formatLocation(Friend.Location)])
        : returnInitalFormState();
    const [ownerForm, setownerForm] = useState(initalForm);
    const [isFormValid, setIsFormValid] = useState(false);
    //WEATHER
    const [weather, latitude, longitude, setlatitude, setlongitude, setWeather] = useWeather(initialWeather);
    let mapWeather = weather ? weather.weather[0].main : null;
    //SELECTED LOCATION
    const [selectedLocationId, setselectedLocationId] = useState(initalLocationId);
    //Typeahead Location Array
    const [LocationArray] = useLocation(LocationArrayProps, initialLocation);
    //Outside Click
    const OnOutsideClickFunction = () => {
        changeActive(Id);
    };
    const componentRef = React.useRef(null);
    if (edit) {
        HookHelpers.useOutSideClick(componentRef, OnOutsideClickFunction);
    }
    //on loading get the current weather and then display in wweather section and map
    //function which undate the form
    function handleChangeEvent(event, id) {
        const updatedOwnerForm = ownerForm;
        updatedOwnerForm[id] = formUtilityActions.executeValidationAndReturnFormElement(event, updatedOwnerForm, LocationArray, id);
        const isFormValid = formUtilityActions.countInvalidElements(updatedOwnerForm);
        setIsFormValid(isFormValid);
        setownerForm(updatedOwnerForm);
        if (id === "Location") {
            requestTAValues(event);
        }
    }
    async function SubmitForm(event, type) {
        event.preventDefault();
        const updatedOwnerForm = formUtilityActions.executeFormValidationAndReturnForm(ownerForm, LocationArray);
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
        const matchingLocation = LocationArray.find(l => HF.formatLocation(l) === TAvalue);
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
        const weather = await locationServices.getWeather(matchingLocation.Latitude, matchingLocation.Longitude);
        setWeather(weather);
    }
    async function addFriend() {
        await locationServices.addFriend(ownerForm.Name.value, selectedLocationId);
        await loadFriends();
        setownerForm(returnInitalFormState([]));
    }
    async function editFriend() {
        if (Friend) {
            await locationServices.editFriend(ownerForm.Name.value, selectedLocationId, Friend.Id);
            await loadFriends();
            changeActive();
        }
    }
    async function deleteFriend() {
        if (Friend) {
            await locationServices.deleteFriend(Friend.Id);
            loadFriends();
        }
    }
    return (React.createElement("div", { ref: componentRef, "data-testid": "friendForm" },
        React.createElement("form", null,
            formUtilityActions
                .convertStateToArrayOfFormObjects(ownerForm)
                .map(formRow => {
                return (
                //map over the form state
                //pass the each row its props
                // including event handlers to pass state back to friendform component
                React.createElement(FormRow, { key: formRow.id, formRow: formRow, changed: event => handleChangeEvent(event, formRow.id), blur: event => handleChangeEvent(event, formRow.id), 
                    //TypeAhead Specific props
                    items: locationHelpers.uniqueTAValues(LocationArray || []), selectHandler: val => selectTAHandler(val, formRow.id) }));
            }),
            React.createElement("br", null),
            React.createElement(Weather, { weather: weather, showLabel: false }),
            edit ? (React.createElement(React.Fragment, null,
                React.createElement("button", { className: "btn btn--small", type: "submit", onClick: e => SubmitForm(e, "EDIT") }, "Comfirm Edit"),
                React.createElement("button", { className: "btn btn--small", onClick: e => SubmitForm(e, "DELETE") }, "Delete"))) : (React.createElement("button", { type: "submit", className: "btn btn--small", onClick: e => SubmitForm(e, "ADD") }, "Add friend"))),
        React.createElement(MapComponent, { mapKey: "addNew", position: {
                latitude,
                longitude
            }, style: styles.map, zoom: 9, weather: mapWeather })));
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
const connectedFriendFormComponent = connect(mapStateToProps, mapDispatchToProps)(FriendFormComponent);
export default connectedFriendFormComponent;
////customHooks
function useWeather(initialWeather) {
    let shouldWeatherLoad = false;
    //either take the inital location from the
    //weather object or generate a random number
    let initialLatitude = initialWeather
        ? initialWeather.coord.lat
        : HF.generateRandomNumber(-70, 70);
    let initialLongitude = initialWeather
        ? initialWeather.coord.lon
        : HF.generateRandomNumber(-180, 180);
    //generate the stae variables
    const [weather, setWeather] = useState(initialWeather);
    const [latitude, setlatitude] = useState(initialLatitude);
    const [longitude, setlongitude] = useState(initialLongitude);
    //every time the latitude or longitude  changes - fetch a new weather object
    // but only do this if not inital weather was supplied or irs, not the
    // first time this function is called
    if (!initialWeather || shouldWeatherLoad) {
        useEffect(() => {
            locationServices.getWeather(latitude, longitude).then(result => {
                setWeather(result);
            });
        }, [latitude, longitude]);
    }
    else {
        shouldWeatherLoad = true;
    }
    return [weather, latitude, longitude, setlatitude, setlongitude, setWeather];
}
function useLocation(LocationArrayProps, initialLocation) {
    //set the locationArray to be the LocationArrayProps
    //or default to the inital Location
    const [LocationArray, setlocationArray] = useState(LocationArrayProps || initialLocation);
    useEffect(() => {
        setlocationArray(LocationArrayProps || initialLocation || []);
    }, [LocationArrayProps]);
    return [LocationArray];
}
//# sourceMappingURL=friendFormHook.js.map