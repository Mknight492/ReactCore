"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//style imports
const react_bootstrap_1 = require("react-bootstrap");
const helpers_1 = require("../../helpers");
const styles = require("../friendForm/friendForm.module.scss");
//component imports
const weather_1 = require("../weather/weather");
const maphook_1 = require("../map/maphook");
//redux imports
const react_redux_1 = require("react-redux");
const actions_1 = require("../../redux/actions");
const services_1 = require("../../redux/services");
//helper functions
const weatherInputs_1 = require("../UI/inputs/weatherInputs");
const helpers_2 = require("../../helpers");
const { useState, useEffect } = React;
const TestComponent = ({ Friend, initialWeather, edit, loadFriends, loadLocation, changeActive }) => {
    ///FORM
    const initalForm = edit
        ? helpers_1.returnInputConfiguration([
            Friend.Name,
            helpers_2.HF.formatLocation(Friend.Location)
        ])
        : helpers_1.returnInputConfiguration();
    const [ownerForm, setownerForm] = useState(initalForm);
    const [isFormValid, setIsFormValid] = useState(false);
    //WEATHER
    const [weather, latitude, longitude, setlatitude, setlongitude, setWeather] = useWeather(initialWeather, 0, 0);
    //SELECTED LOCATION
    const [selectedLocationId, setselectedLocationId] = useState(Friend.Location.Geonameid);
    //Typeahead Location Array
    const [LocationArray, setlocationArray] = useState([Friend.Location]);
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
            loadLocation(searchTerm, Friend.Id); // dispatches API call
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
        //update the state to include the selectedId (for API calls )
        // get the weather for the new location and display it on the map
        const weather = await services_1.locationServices.getWeather(matchingLocation.Latitude, matchingLocation.Longitude);
        setWeather(weather);
    }
    async function addFriend() {
        await services_1.locationServices.addFriend(ownerForm.Name.value, selectedLocationId);
        await loadFriends();
        //setownerForm(returnInputConfiguration([]));
    }
    async function editFriend() {
        await services_1.locationServices.editFriend(ownerForm.Name.value, selectedLocationId, Friend.Id);
        await loadFriends();
        changeActive();
    }
    async function deleteFriend() {
        await services_1.locationServices.deleteFriend(Friend.Id);
        loadFriends();
    }
    let mapWeather;
    weather ? (mapWeather = weather.weather[0].main) : (mapWeather = null);
    return (React.createElement(react_bootstrap_1.Well, null,
        React.createElement(react_bootstrap_1.Form, { horizontal: true },
            helpers_1.formUtilityActions
                .convertStateToArrayOfFormObjects(ownerForm)
                .map(element => {
                return (React.createElement(weatherInputs_1.default, { key: element.id, elementType: element.element, id: element.id, label: element.label, type: element.type, value: element.value, changed: event => handleChangeEvent(event, element.id), errorMessage: element.errorMessage, invalid: !element.valid, shouldValidate: element.validation, touched: element.touched, blur: event => handleChangeEvent(event, element.id), 
                    //TypeAhead Specific props
                    items: helpers_2.locationHelpers.uniqueTAValues(LocationArray), selectHandler: val => selectTAHandler(val, element.id) }));
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
    return {
        LocationArray: state.friends[id] || state.friends["AddFriend"] || undefined
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loadFriends: () => {
            dispatch(actions_1.friendActions.loadFriendAttemptAG());
        },
        changeActive: id => {
            dispatch(actions_1.friendActions.changeFriendAG(id));
        },
        loadLocation: (searchTerm, Id) => {
            dispatch(actions_1.friendActions.loadLocationTAAttempt(searchTerm, Id));
        }
    };
}
const connectedTestComponent = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TestComponent);
exports.default = connectedTestComponent;
////customHook
function useWeather(initialWeather, initialLatitude, initialLongitude) {
    const [weather, setWeather] = useState(initialWeather);
    //LOCATION
    const [latitude, setlatitude] = useState(initialLatitude || helpers_2.HF.generateRandomNumber(-70, 70));
    const [longitude, setlongitude] = useState(initialLongitude || helpers_2.HF.generateRandomNumber(-180, 180));
    useEffect(() => {
        services_1.locationServices.getWeather(latitude, longitude).then(result => {
            setWeather(result);
        });
    }, [latitude, longitude]);
    return [weather, latitude, longitude, setlatitude, setlongitude, setWeather];
}
//# sourceMappingURL=testhook.js.map