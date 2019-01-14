import { HF } from "../../helpers";
import { weatherAPI } from "../../security";
export const locationServices = {
  getCities,
  addFriend,
  editFriend,
  deleteFriend,
  getWeather
};

async function getCities(name) {
  const result = await HF.AFfetch(`/api/location?type=location&query=${name}`, {
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
  const result = await HF.Appfetch("/api/friend", {
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
  console.log(Name, Location, Id);
  const data = JSON.stringify({ Name, LocationId, Id });
  const result = await HF.Appfetch("/api/friend", {
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
  const result = await HF.Appfetch("/api/friend/" + Id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return result;
}

async function getWeather(latitude: number, longitude: number) {
  try {
    const APIdata = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPI}&units=metric`
    );
    const APIdataParsed = await APIdata.json();
    return APIdataParsed;
  } catch (e) {
    return e;
  }
}
