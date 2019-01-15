import * as React from "react";
import * as styles from "./internalServer.module.scss";
import { connect } from "react-redux";
import { Link } from "@reach/router";

const internalServer = props => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {"500 SERVER ERROR, CONTACT ADMINISTRATOR!"}
      </h2>
      <h3 className={styles.errorMessage}>{props.errorMessage}</h3>
      <Link to={"/"} className={styles.link}>
        {"Return Home..."}
      </Link>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    errorMessage: state.errorHandler.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const ConnectInternalServer = connect(
  mapStateToProps,
  mapDispatchToProps
)(internalServer);

export default ConnectInternalServer;
