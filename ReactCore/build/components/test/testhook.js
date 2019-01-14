"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
//style imports
var react_bootstrap_1 = require("react-bootstrap");
var helpers_1 = require("../../helpers");
var styles = require("../friendForm/friendForm.module.scss");
//component imports
var weather_1 = require("../weather/weather");
var maphook_1 = require("../map/maphook");
//redux imports
var react_redux_1 = require("react-redux");
var actions_1 = require("../../redux/actions");
var services_1 = require("../../redux/services");
//helper functions
var weatherInputs_1 = require("../UI/inputs/weatherInputs");
var helpers_2 = require("../../helpers");
var useState = React.useState, useEffect = React.useEffect;
function useWeather(initialWeather, initialLatitude, initialLongitude) {
    var _a = useState(initialWeather), weather = _a[0], setWeather = _a[1];
    //LOCATION
    var _b = useState(initialLatitude || helpers_2.HF.generateRandomNumber(-70, 70)), latitude = _b[0], setlatitude = _b[1];
    var _c = useState(initialLongitude || helpers_2.HF.generateRandomNumber(-180, 180)), longitude = _c[0], setlongitude = _c[1];
    useEffect(function () {
        services_1.locationServices.getWeather(latitude, longitude).then(function (result) {
            setWeather(result);
        });
    }, [latitude, longitude]);
    return [weather, latitude, longitude, setlatitude, setlongitude, setWeather];
}
var TestComponent = function (_a) {
    ///FORM
    var Id = _a.Id, _b = _a.initialWeather, initialWeather = _b === void 0 ? null : _b, _c = _a.initialName, initialName = _c === void 0 ? "" : _c, initialLatitude = _a.initialLatitude, initialLongitude = _a.initialLongitude, _d = _a.location, location = _d === void 0 ? [] : _d, _e = _a.LocationArray, LocationArray = _e === void 0 ? [location] : _e, edit = _a.edit, loadFriends = _a.loadFriends, loadLocation = _a.loadLocation, changeActive = _a.changeActive;
    var initalForm = edit
        ? helpers_1.returnInputConfiguration([initialName, helpers_2.HF.formatLocation(location)])
        : helpers_1.returnInputConfiguration();
    var _f = useState(initalForm), ownerForm = _f[0], setownerForm = _f[1];
    var _g = useState(false), isFormValid = _g[0], setIsFormValid = _g[1];
    //WEATHER
    var _h = useWeather(initialWeather, 0, 0), weather = _h[0], latitude = _h[1], longitude = _h[2], setlatitude = _h[3], setlongitude = _h[4], setWeather = _h[5];
    //SELECTED LOCATION
    var _j = useState(location.geonameid), selectedLocationId = _j[0], setselectedLocationId = _j[1];
    //on loading get the current weather and then display in wweather section and map
    //function which undate the form
    function handleChangeEvent(event, id) {
        var updatedOwnerForm = ownerForm;
        updatedOwnerForm[id] = helpers_1.formUtilityActions.executeValidationAndReturnFormElement(event, updatedOwnerForm, LocationArray, id);
        var isFormValid = helpers_1.formUtilityActions.countInvalidElements(updatedOwnerForm);
        setIsFormValid(isFormValid);
        setownerForm(updatedOwnerForm);
        if (id === "Location") {
            requestTAValues(event);
        }
    }
    function SubmitForm(event, type) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedOwnerForm, isFormValid, method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        updatedOwnerForm = helpers_1.formUtilityActions.executeFormValidationAndReturnForm(ownerForm, LocationArray);
                        isFormValid = helpers_1.formUtilityActions.countInvalidElements(ownerForm);
                        setIsFormValid(isFormValid);
                        setownerForm(updatedOwnerForm);
                        if (!isFormValid) return [3 /*break*/, 2];
                        method = void 0;
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
                        return [4 /*yield*/, method()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    function requestTAValues(event) {
        var searchTerm = event.target.value;
        if (!helpers_2.HF.isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
            //ensures atleast 3 letters before sending TA API call
            loadLocation(searchTerm, Id); // dispatches API call
        }
    }
    function selectTAHandler(TAvalue, id) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingLocation, weather;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        matchingLocation = LocationArray.find(function (l) { return helpers_2.HF.formatLocation(l) === TAvalue; });
                        //get the form obj, update the value and set valid to true (as a location has been selected)
                        setownerForm(function (oldForm) {
                            oldForm[id].valid = true;
                            oldForm[id].value = TAvalue;
                            return oldForm;
                        });
                        setlatitude(matchingLocation.latitude);
                        setlongitude(matchingLocation.longitude);
                        setselectedLocationId(matchingLocation.geonameid);
                        return [4 /*yield*/, services_1.locationServices.getWeather(matchingLocation.latitude, matchingLocation.longitude)];
                    case 1:
                        weather = _a.sent();
                        setWeather(weather);
                        return [2 /*return*/];
                }
            });
        });
    }
    function addFriend() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services_1.locationServices.addFriend(ownerForm.Name.value, selectedLocationId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, loadFriends()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function editFriend() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services_1.locationServices.editFriend(ownerForm.Name.value, selectedLocationId, Id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, loadFriends()];
                    case 2:
                        _a.sent();
                        changeActive(null);
                        return [2 /*return*/];
                }
            });
        });
    }
    function deleteFriend() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services_1.locationServices.deleteFriend(Id)];
                    case 1:
                        _a.sent();
                        loadFriends();
                        return [2 /*return*/];
                }
            });
        });
    }
    var mapWeather;
    weather ? (mapWeather = weather.weather[0].main) : (mapWeather = null);
    return (React.createElement(react_bootstrap_1.Well, null,
        React.createElement(react_bootstrap_1.Form, { horizontal: true },
            helpers_1.formUtilityActions
                .convertStateToArrayOfFormObjects(ownerForm)
                .map(function (element) {
                return (React.createElement(weatherInputs_1.default, { key: element.id, elementType: element.element, id: element.id, label: element.label, type: element.type, value: element.value, changed: function (event) { return handleChangeEvent(event, element.id); }, errorMessage: element.errorMessage, invalid: !element.valid, shouldValidate: element.validation, touched: element.touched, blur: function (event) { return handleChangeEvent(event, element.id); }, 
                    //TypeAhead Specific props
                    items: helpers_2.locationHelpers.uniqueTAValues(LocationArray), selectHandler: function (val) { return selectTAHandler(val, element.id); } }));
            }),
            React.createElement("br", null),
            React.createElement(weather_1.Weather, { weather: weather }),
            edit ? (React.createElement(React.Fragment, null,
                React.createElement("button", { className: "btn btn--small", type: "submit", onClick: function (e) { return SubmitForm(e, "EDIT"); } }, "Comfirm Edit"),
                React.createElement("button", { className: "btn btn--small", onClick: function (e) { return SubmitForm(e, "DELETE"); } }, "Delete"))) : (React.createElement("button", { type: "submit", className: "btn btn--small", onClick: function (e) { return SubmitForm(e, "ADD"); } }, "Add friend"))),
        React.createElement(maphook_1.default, { mapKey: "addNew", position: {
                latitude: latitude,
                longitude: longitude
            }, style: styles.map, zoom: 9, weather: mapWeather })));
};
function mapStateToProps(state) {
    var id = state.friends.isActive;
    return {
        LocationArray: state.friends[id] || state.friends["AddFriend"] || undefined
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loadFriends: function () {
            dispatch(actions_1.friendActions.loadFriendAttemptAG());
        },
        changeActive: function (id) {
            dispatch(actions_1.friendActions.changeFriendAG(id));
        },
        loadLocation: function (searchTerm, Id) {
            dispatch(actions_1.friendActions.loadLocationTAAttempt(searchTerm, Id));
        }
    };
}
var connectedTestComponent = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TestComponent);
exports.default = connectedTestComponent;
//# sourceMappingURL=testhook.js.map