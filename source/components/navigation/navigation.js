import React from "react";
import styles from "./navigation.module.scss";
import { Link } from "@reach/router";

const NavigationComponent = () => {
  return true ? (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <Link to={"/weather"}> Weather</Link>
      <Link to={"/identity"}> Register </Link>
      <Link to={"/identityLogin"}> Login </Link>
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

export default NavigationComponent;
