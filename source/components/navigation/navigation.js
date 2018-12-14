import React from "react";
import styles from "./navigation.css";
import { Link } from "@reach/router";

const NavigationComponent = ({ user }) => {
  return user ? (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <Link to={"/weather"}> Weather</Link>
      <Link to={"/identity"}> Register </Link>
      <Link to={"/identityLogin"}> Login </Link>
    </div>
  ) : (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <Link to={"/identity"}> Register </Link>
      <Link to={"/identitylogin"}> IdentityLogin </Link>
    </div>
  );
};

export default NavigationComponent;
