import React from "react";
import * as styles from "./drawerToggleButton.module.scss";

interface OwnProps {}
interface StateProps {
  clickHandler: () => void;
}
interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const drawerToggleButton: React.FunctionComponent<Props> = ({
  clickHandler
}) => (
  <button className={styles.toggleButton} onClick={clickHandler}>
    <div className={styles.toggleButtonLine} />
    <div className={styles.toggleButtonLine} />
    <div className={styles.toggleButtonLine} />
  </button>
);

export default drawerToggleButton;
