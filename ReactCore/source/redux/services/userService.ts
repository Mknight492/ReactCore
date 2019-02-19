import { authHeader, config, HF } from "../../helpers";
import { Route } from "security";
import { loginViewModel } from "models";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(form: loginViewModel) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  };

  return fetch("/account2/login", requestOptions)
    .then(handleResponse, handleError)
    .then(user => {
      // login successful if there's a jwt token in the response
      //@ts-ignore
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      }
      //must reload the page to update the antiforgerytoken
      window.location.replace(Route());

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
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  fetch("/account2/register", requestOptions)
    .then(handleResponse, handleError)
    .then(user => {
      window.location.replace(Route());
    });
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
          resolve(json);
        });
      } else {
        resolve();
      }
    } else {
      // return error message from response body
      response.text().then(text => reject(text));
    }
  });
}

function handleError(error) {
  return Promise.reject(error && error.message);
}
