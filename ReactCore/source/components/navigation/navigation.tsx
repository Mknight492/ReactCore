import * as React from "react";
import * as styles from "./navigation.module.scss";
import { Link } from "@reach/router";
import { HF } from "helpers";
import { userService } from "redux/services";

import { connect } from "react-redux";
import { userActions } from "redux/actions";

//models
import { ApplicationUserDto } from "models";

const { useEffect } = React;

const getUserService = () => import("redux/services/userService");

interface OwnProps {}
interface StateProps {
  user?: ApplicationUserDto;
  LoggedIn?: boolean;
}
interface DispatchProps {
  getUser: Function;
}
interface State {}

type Props = OwnProps & StateProps & DispatchProps & State;

const NavigationComponent: React.FunctionComponent<Props> = ({
  user,
  LoggedIn,
  getUser
}) => {
  let loaded;
  useEffect(
    () => {
      getUser();
    },
    [loaded]
  );

  const logOut = async () => {
    // let userService = await getUserService();
    // debugger;
    // let def = userService.logout;
    // userService.logout();
  };

  return user ? (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <Link to={"/weather"}> Weather</Link>
      <Link to={"/identity"}> Register </Link>
      <Link
        to={"/identityLogin"}
        onClick={() => {
          userService.logout();
          logOut();
        }}
      >
        {" "}
        Logout{" "}
      </Link>
      <a href="/Manage/index">{user.FirstName}</a>
    </div>
  ) : (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <a href={"/Account/register"}> Register </a>
      <a href={"/Account/login"}> Login </a>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.users.user,
    LoggedIn: state.users.LoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(userActions.getUserRequest())
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent);

async function getUser() {
  const user = await HF.Appfetch("/api/Authenticate/CheckUser");
  const userJson = await user.json();
  return userJson;
}
