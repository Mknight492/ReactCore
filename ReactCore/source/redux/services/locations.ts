import { HF } from "../../helpers";
import { weatherAPI } from "../../security";
import axios from "axios";
import { store } from "redux/store/configure-store";
import { friendActions } from "redux/actions";
import { Friend, EditFriendModel, WeatherObject } from "models";

export const locationServices = {
  getCities,
  addFriend,
  editFriend,
  deleteFriend,
  getWeather,
  getRandom
};

async function getCities(name) {
  const result = await HF.AppAxios({
    url: `/api/location/get?type=location&query=${name}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return result.data;
}

async function getRandom() {
  const result = await HF.AppAxios({
    url: "/api/location/random"
  });
  return result;
}

async function addFriend(Name, LocationId) {
  const data = JSON.stringify({ Name, LocationId });

  const result = await HF.AppAxios({
    url: "api/friend/create",
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data
  });

  return result;
}

async function editFriend(FriendToEdit: Friend) {
  const result = await HF.AppAxios({
    url: "/api/friend/update",
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(FriendToEdit)
  });
  store.dispatch(friendActions.editFriendSuccessAG(FriendToEdit));
  return result;
}

async function deleteFriend(Id) {
  const result = await HF.Appfetch("/api/friend/delete/" + Id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  store.dispatch(friendActions.deleteFriendSuccessAG(Id));
  return result;
}

async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherObject> {
  console.log("getting weather");
  try {
    const APIdata = await axios({
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPI}&units=metric`
    });
    return APIdata.data;
  } catch (e) {
    return e;
  }
}
