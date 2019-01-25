"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const security_1 = require("../../security");
const axios_1 = __importDefault(require("axios"));
const index_1 = require("index");
const actions_1 = require("redux/actions");
exports.locationServices = {
    getCities,
    addFriend,
    editFriend,
    deleteFriend,
    getWeather
};
async function getCities(name) {
    const result = await helpers_1.HF.AppAxios({
        url: `/api/location?type=location&query=${name}`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const parsedResult = await result.data;
    return parsedResult;
}
async function addFriend(Name, LocationId) {
    const data = JSON.stringify({ Name, LocationId });
    const result = await helpers_1.HF.AppAxios({
        url: "api/friend",
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        data
    });
    return result;
}
async function editFriend(FriendToEdit) {
    const result = await helpers_1.HF.AppAxios({
        url: "/api/friend",
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(FriendToEdit)
    });
    index_1.store.dispatch(actions_1.friendActions.editFriendSuccessAG(FriendToEdit));
    return result;
}
async function deleteFriend(Id) {
    const result = await helpers_1.HF.Appfetch("/api/friend/" + Id, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    index_1.store.dispatch(actions_1.friendActions.deleteFriendSuccessAG(Id));
    return result;
}
async function getWeather(latitude, longitude) {
    try {
        const APIdata = await axios_1.default({
            url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${security_1.weatherAPI}&units=metric`
        });
        return APIdata.data;
    }
    catch (e) {
        return e;
    }
}
//# sourceMappingURL=locations.js.map