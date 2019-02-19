import React from "react";
import { Link } from "@reach/router";

import { loginRoute } from "security";

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
    debugger;
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
          onClick={async () => {
            await logOut();
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
        <a href={"/Account/register"}> Register </a>
      </li>
      <li>
        <a href={"/Account/login"}> Login </a>
      </li>
      <li>
        <a href={"/react/login"}>React Login </a>
      </li>
      <Link to={"/weather"} data-testid="weatherLink">
        Weather
      </Link>
    </ul>
  );
};

export default Links;
