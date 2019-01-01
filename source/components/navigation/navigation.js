import React from "react";
import styles from "./navigation.module.scss";
import { Link } from "@reach/router";
import { HF } from "../../helpers";
const NavigationComponent = ({ user, LoggedIn, getUser }) => {
  getUser();

  return LoggedIn ? (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <Link to={"/weather"}> Weather</Link>
      <Link to={"/identity"}> Register </Link>
      <Link to={"/identityLogin"}> Login </Link>
      <a href="/Account/Login"> Login .Net</a>
    </div>
  ) : (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <Link to={"/weather"}> Weather</Link>
      <Link to={"/identity"}> Register </Link>
      <Link to={"/identityLogin"}> IdentityLogin </Link>
    </div>
  );
};

async function getUser() {
  const user = await HF.Appfetch("/api/Authenticate/CheckUser");
  const userJson = await user.json();
  return userJson;
}

class NavigationComponentClass extends React.Component {
  constructor(...args) {
    super(...args);
  }
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    console.log(this.props.user);
    return this.props.LoggedIn ? (
      <div className={styles.container}>
        <Link to={"/"}>Home</Link>
        <Link to={"/weather"}> Weather</Link>
        <Link to={"/identity"}> Register </Link>
        <Link to={"/identityLogin"}> Logout </Link>
        <a href="/Manage/index">{this.props.user.firstName}</a>
      </div>
    ) : (
      <div className={styles.container}>
        <Link to={"/"}>Home</Link>
        <a href={"/Account/register"}> Register </a>
        <a href={"/Account/login"}> Login </a>
      </div>
    );
  }
}

export default NavigationComponentClass;
