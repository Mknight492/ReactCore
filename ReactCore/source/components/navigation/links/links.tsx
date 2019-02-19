import React from "react";
import { Link } from "@reach/router";

import { loginRoute, Route } from "security";

const Links = props => {
  let user;
  let Json = sessionStorage.getItem("user");
  if (Json) {
    user = JSON.parse(Json);
  }
  if (user && user.Id === null) user = null;
  const getUserService = () => import("redux/services/userService");
  const logOut = async () => {
    const { userService } = await getUserService();
    await userService.logout();
    window.location.replace(loginRoute());
    // let def = userService.logout;
    // userService.logout();
  };

  return user ? (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/weather"} data-testid="weatherLink">
          Weather
        </Link>
      </li>
      <li>
        <a
          href=""
          onClick={async e => {
            e.preventDefault();
            await logOut();
            window.location.replace(loginRoute());
          }}
        >
          Logout
        </a>
      </li>
      <li>
        <a href="/Manage/index">{user.FirstName}</a>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/react/register"}>Register </Link>
      </li>

      <li>
        <Link to={"/react/login"}> Login </Link>
      </li>
      <li>
        <Link to={"/weather"} data-testid="weatherLink">
          Weather
        </Link>
      </li>
    </ul>
  );
};

export default Links;
