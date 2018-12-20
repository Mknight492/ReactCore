export const locationServices = {
  getCities,
  submitForm,
  editFriend,
  deleteFriend
};

async function getCities(name) {
  const result = await fetch(`/api/location?type=location&query=${name}`, {
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
  const result = await fetch("/api/friend", {
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
  const result = await fetch("/api/friend", {
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
  const result = await fetch("/api/friend/" + Id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return result;
}
