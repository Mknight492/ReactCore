import React from "react";
import styles from "./navigation.css";
import { Link } from "@reach/router";

const NavigationComponent = ({ user }) => {
  return user ? (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <Link to={"/weather"}> Weather</Link>
      <a href="/home/net"> to Net </a>
      <Link to={"/apitest"}> APITest</Link>
      <Link to={"/register"}> Register </Link>
      <Link to={"/login"}> Login </Link>
    </div>
  ) : (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <Link to={"/register"}> Register </Link>
      <Link to={"/login"}> Login </Link>
    </div>
  );
};

export default NavigationComponent;
