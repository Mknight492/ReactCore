import { HF } from "../../helpers";
import { weatherAPI } from "../../../security";
export const locationServices = {
  getCities,
  submitForm,
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

async function submitForm(Name, Location) {
  const data = JSON.stringify({ Name, Location });
  const result = await HF.AFfetch("/api/friend", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: data
  });
  return result;
}

async function editFriend(Name, Location, Id) {
  const data = JSON.stringify({ Name, Location, Id });
  const result = await HF.AFfetch("/api/friend", {
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
  const result = await HF.AFfetch("/api/friend/" + Id, {
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
    const APIdata = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPI}&units=metric`
    );
    const APIdataParsed = await APIdata.json();
    return APIdataParsed;
  } catch (e) {
    return e;
  }
}
