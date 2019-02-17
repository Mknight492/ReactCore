import * as React from "react";
import * as styles from "./navigation.module.scss";
import { Link } from "@reach/router";
import { HF } from "helpers";
import { userService } from "redux/services";

import { connect } from "react-redux";
import { userActions } from "redux/actions";

import { loginRoute } from "security";

//components
import DrawerToggleButton from "./drawerToggleButton/drawerToggleButton";
import Backdrop from "components/backdrop/backdrop";
import SideDrawer from "components/navigation/sideDrawer/sideDrawer";
import Links from "./links/links";
//models
import { ApplicationUserDto } from "models";

//import loadable

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

type Props = OwnProps & StateProps & DispatchProps;

const NavigationComponent: React.FunctionComponent<Props> = ({
  user,
  LoggedIn,
  getUser
}) => {
  //get the user from backend authentication API - would only be
  //needed in serverless/AWS lamda
  let loaded;
  useEffect(() => {
    getUser();
  }, [loaded]);

  const logOut = async () => {
    const { userService } = await getUserService();
    debugger;
    await userService.logout();
    window.location.replace(loginRoute());
    // let def = userService.logout;
    // userService.logout();
  };

  const [sideDrawerState, toggleSideDrawerState] = React.useState(false);

  const drawerToggleClickHandler = () => {
    toggleSideDrawerState(currentlyOpenOrShut => !currentlyOpenOrShut);
  };

  const backdropClickHandler = () => {
    toggleSideDrawerState(false);
  };

  return (
    <>
      <header className={styles.navbar}>
        <nav className={styles.navbarNavigation}>
          <div>
            <DrawerToggleButton clickHandler={drawerToggleClickHandler} />
          </div>
          <div className={styles.navbarLogo}>
            <a>
              Weather Wherever <i className={`sunCloud ${styles.icon}`} />
            </a>
          </div>
          <div className={styles.spacer} />
          <div className={styles.navbarNavigationItems}>
            <Links />
          </div>
        </nav>
      </header>

      <div style={{ marginTop: "6rem" }} />
      <SideDrawer
        open={sideDrawerState}
        closeDrawerClick={backdropClickHandler}
      />
      {sideDrawerState && (
        <>
          <Backdrop clickHandler={backdropClickHandler} />
        </>
      )}
    </>
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
    getUser: async () => {
      const { userService } = await getUserService();
      dispatch(userActions.getUserRequest());
    }
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
