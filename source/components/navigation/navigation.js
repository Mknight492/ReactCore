import React from "react";
import styles from "./navigation.css";
import { Link } from "@reach/router";
const NavigationComponent = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/weather"}> Weather</Link>
        </li>
        <li>
          <a href="/home/net"> to Net </a>
        </li>
      </ul>
    </div>
  );
};

export default NavigationComponent;
