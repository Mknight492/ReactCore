import React from "react";
import styles from "./navigation.css";
import { Link } from "@reach/router";
const NavigationComponent = () => {
  return (
    <div className={styles.container}>
      <Link to={"/"}>Home</Link>
      <Link to={"/weather"}> Weather</Link>
      <a href="/home/net"> to Net </a>
      <Link to={"/apitest"}> APITest</Link>
    </div>
  );
};

export default NavigationComponent;
