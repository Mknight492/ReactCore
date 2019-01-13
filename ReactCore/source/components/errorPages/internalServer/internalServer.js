import React from "react";
import styles from "./internalServer.container.scss";
import { connect } from "react-redux";

const internalServer = props => {
  return (
    <p className={styles.internalServer}>
      {"500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!"}
      {props.errorMessage}
    </p>
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
