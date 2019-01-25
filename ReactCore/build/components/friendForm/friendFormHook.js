"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const helpers_1 = require("helpers");
const styles = __importStar(require("./friendForm.module.scss"));
//component imports
const weather_1 = require("../weather/weather");
const maphook_1 = __importDefault(require("../map/maphook"));
//redux imports
const react_redux_1 = require("react-redux");
const actions_1 = require("redux/actions");
const services_1 = require("redux/services");
//helper functions
const weatherInputs_1 = __importDefault(require("components/UI/inputs/weatherInputs"));
const helpers_2 = require("helpers");
//Custom Hooks
const customHooks_1 = require("customHooks");
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
        ? helpers_1.returnInitalFormState([Friend.Name, helpers_2.HF.formatLocation(Friend.Location)])
        : helpers_1.returnInitalFormState();
    const [ownerForm, setownerForm] = useState(initalForm);
    const [isFormValid, setIsFormValid] = useState(false);
    //WEATHER
    const [weather, latitude, longitude, setlatitude, setlongitude, setWeather] = useWeather(initialWeather);
    let mapWeather = weather ? weather.weather[0].main : null;
    //SELECTED LOCATION
    const [selectedLocationId, setselectedLocationId] = useState(initalLocationId);
    const [selectedLocation, setselectedLocation] = useState(initialLocation[0]);
    //Typeahead Location Array
    const [LocationArray] = useLocation(LocationArrayProps, initialLocation);
    //Outside Click
    const OnOutsideClickFunction = () => {
        changeActive(Id);
    };
    const componentRef = React.useRef(null);
    if (edit) {
        customHooks_1.HookHelpers.useOutSideClick(componentRef, OnOutsideClickFunction);
    }
    //on loading get the current weather and then display in wweather section and map
    //function which undate the form
    function handleChangeEvent(event, id) {
        const updatedOwnerForm = ownerForm;
        updatedOwnerForm[id] = helpers_1.formUtilityActions.executeValidationAndReturnFormElement(event, updatedOwnerForm, LocationArray, id);
        const isFormValid = helpers_1.formUtilityActions.countInvalidElements(updatedOwnerForm);
        setIsFormValid(isFormValid);
        setownerForm(updatedOwnerForm);
        if (id === "Location") {
            requestTAValues(event);
        }
    }
    async function SubmitForm(event, type) {
        event.preventDefault();
        const updatedOwnerForm = helpers_1.formUtilityActions.executeFormValidationAndReturnForm(ownerForm, LocationArray);
        const isFormValid = helpers_1.formUtilityActions.countInvalidElements(ownerForm);
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
        if (!helpers_2.HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
            //ensures atleast 3 letters before sending TA API call
            loadLocation(searchTerm, Id); // dispatches API call
        }
    }
    async function selectTAHandler(TAvalue, id) {
        //find the location object that matches  the  TypeAhead value
        const matchingLocation = LocationArray.find(l => helpers_2.HF.formatLocation(l) === TAvalue);
        //get the form obj, update the value and set valid to true (as a location has been selected)
        setownerForm(oldForm => {
            oldForm[id].valid = true;
            oldForm[id].value = TAvalue;
            return oldForm;
        });
        setlatitude(matchingLocation.Latitude);
        setlongitude(matchingLocation.Longitude);
        setselectedLocationId(matchingLocation.Geonameid);
        setselectedLocation(matchingLocation);
        //update the state to include the selectedId (for API calls )
        console.log("here");
        // get the weather for the new location and display it on the map
        const weather = await services_1.locationServices.getWeather(matchingLocation.Latitude, matchingLocation.Longitude);
        setWeather(weather);
    }
    async function addFriend() {
        await services_1.locationServices.addFriend(ownerForm.Name.value, selectedLocationId);
        await loadFriends();
        setownerForm(helpers_1.returnInitalFormState([]));
    }
    async function editFriend() {
        if (Friend) {
            let EditedFriend = {
                Name: ownerForm.Name.value,
                LocationId: selectedLocationId,
                Id: Friend.Id,
                UserId: Friend.UserId,
                Location: selectedLocation
            };
            await services_1.locationServices.editFriend(EditedFriend);
            changeActive();
        }
    }
    async function deleteFriend() {
        if (Friend) {
            await services_1.locationServices.deleteFriend(Friend.Id);
            //loadFriends();
        }
    }
    return (React.createElement("div", { ref: componentRef, "data-testid": "friendForm" },
        React.createElement("form", null,
            helpers_1.formUtilityActions
                .convertStateToArrayOfFormObjects(ownerForm)
                .map(formRow => {
                return (
                //map over the form state
                //pass the each row its props
                // including event handlers to pass state back to friendform component
                React.createElement(weatherInputs_1.default, { key: formRow.id + "row", formRow: formRow, changed: event => handleChangeEvent(event, formRow.id), blur: event => handleChangeEvent(event, formRow.id), 
                    //TypeAhead Specific props
                    items: helpers_2.locationHelpers.uniqueTAValues(LocationArray || []), selectHandler: val => selectTAHandler(val, formRow.id), locations: LocationArray }));
            }),
            React.createElement("br", null),
            React.createElement(weather_1.Weather, { weather: weather, showLabel: false }),
            edit ? (React.createElement(React.Fragment, null,
                React.createElement("button", { className: "btn btn--small", type: "submit", onClick: e => SubmitForm(e, "EDIT") }, "Comfirm Edit"),
                React.createElement("button", { className: "btn btn--small", onClick: e => SubmitForm(e, "DELETE") }, "Delete"))) : (React.createElement("button", { type: "submit", className: "btn btn--small", onClick: e => SubmitForm(e, "ADD") }, "Add friend"))),
        React.createElement(maphook_1.default, { mapKey: "addNew", position: {
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
            dispatch(actions_1.friendActions.loadFriendAttemptAG());
        },
        changeActive: id => {
            dispatch(actions_1.friendActions.changeFriendAG(-1));
            dispatch(actions_1.friendActions.resetFriendsTAValues(id));
        },
        loadLocation: (searchTerm, Id) => {
            dispatch(actions_1.friendActions.loadLocationTAAttempt(searchTerm, Id));
        }
    };
}
const connectedFriendFormComponent = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FriendFormComponent);
exports.default = connectedFriendFormComponent;
////customHooks
function useWeather(initialWeather) {
    let shouldWeatherLoad = false;
    //either take the inital location from the
    //weather object or generate a random number
    let initialLatitude = initialWeather
        ? initialWeather.coord.lat
        : helpers_2.HF.generateRandomNumber(-70, 70);
    let initialLongitude = initialWeather
        ? initialWeather.coord.lon
        : helpers_2.HF.generateRandomNumber(-180, 180);
    //generate the stae variables
    const [weather, setWeather] = useState(initialWeather);
    const [latitude, setlatitude] = useState(initialLatitude);
    const [longitude, setlongitude] = useState(initialLongitude);
    //every time the latitude or longitude  changes - fetch a new weather object
    // but only do this if not inital weather was supplied or irs, not the
    // first time this function is called
    if (!initialWeather || shouldWeatherLoad) {
        useEffect(() => {
            services_1.locationServices.getWeather(latitude, longitude).then(result => {
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