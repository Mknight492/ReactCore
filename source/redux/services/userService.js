import { authHeader, config, HF } from "../../helpers";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch("users/authenticate", requestOptions)
    .then(handleResponse, handleError)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

async function logout() {
  // remove user from local storage to log user out
  const result = await HF.Appfetch("api/authenticate/Logout");
  return result;
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(config.apiUrl + "/users", requestOptions).then(
    handleResponse,
    handleError
  );
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(config.apiUrl + "/users/" + id, requestOptions).then(
    handleResponse,
    handleError
  );
}

function register(user) {
  console.log("here");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch("users/register", requestOptions).then(
    handleResponse,
    handleError
  );
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(config.apiUrl + "/users/" + user.id, requestOptions).then(
    handleResponse,
    handleError
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(config.apiUrl + "/users/" + id, requestOptions).then(
    handleResponse,
    handleError
  );
}

function handleResponse(response) {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      // return json if it was returned in the response
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        response.json().then(json => {
          console.log(json);
          resolve(json);
        });
      } else {
        resolve();
        console.log(json);
      }
    } else {
      // return error message from response body
      response.text().then(text => reject(text));
      console.log(json);
    }
  });
}

function handleError(error) {
  return Promise.reject(error && error.message);
}
