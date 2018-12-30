import React from "react";
import styles from "./internalServer.container.scss";

const internalServer = props => {
  return (
    <p className={styles.internalServer}>
      {"500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!"}
    </p>
  );
};

export default internalServer;
