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

export async function getCities(name) {
  const result = await HF.ServerAxios({
    url: `/api/location/get?type=location&query=${name}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return result.data;
}

export async function getRandom() {
  const result = await HF.ServerAxios({
    url: "/api/location/random"
  });
  return result;
}

export async function addFriend(Name, LocationId) {
  const data = JSON.stringify({ Name, LocationId });

  const result = await HF.ServerAxios({
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

export async function editFriend(FriendToEdit: Friend) {
  const result = await HF.ServerAxios({
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

export async function deleteFriend(Id) {
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

//This should be done via the backend as it exposes the API key to the server
//however as this was a free

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherObject> {
  const APIdata = await HF.ExternalAxios({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPI}&units=metric`
  });
  return APIdata.data;
}
