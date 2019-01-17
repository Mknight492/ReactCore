"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const security_1 = require("../../security");
exports.locationServices = {
    getCities,
    addFriend,
    editFriend,
    deleteFriend,
    getWeather
};
async function getCities(name) {
    const result = await helpers_1.HF.AFfetch(`/api/location?type=location&query=${name}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const parsedResult = await result.json();
    return parsedResult;
}
async function addFriend(Name, LocationId) {
    const data = JSON.stringify({ Name, LocationId });
    const result = await helpers_1.HF.Appfetch("/api/friend", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: data
    });
    return result;
}
async function editFriend(Name, LocationId, Id) {
    console.log(Name, LocationId, Id);
    const data = JSON.stringify({ Name, LocationId, Id });
    const result = await helpers_1.HF.Appfetch("/api/friend", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: data
    });
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
    return result;
}
async function getWeather(latitude, longitude) {
    try {
        const APIdata = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${security_1.weatherAPI}&units=metric`);
        const APIdataParsed = await APIdata.json();
        console.log(APIdataParsed);
        return APIdataParsed;
    }
    catch (e) {
        return e;
    }
}
//# sourceMappingURL=locations.js.map