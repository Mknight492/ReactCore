export function authHeader() {
  // return authorization header with jwt token
    let userString = localStorage.getItem("user")
    let user
    if (userString) {
        user = JSON.parse(userString);
    }

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {Authorization: ""};
  }
}
