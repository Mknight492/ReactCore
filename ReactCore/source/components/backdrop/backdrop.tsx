import React from "react";

import * as styles from "./backdrop.module.scss";

interface OwnProps {
  clickHandler: () => void;
}
interface StateProps {}
interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps;

const backdrop: React.FunctionComponent<Props> = ({ clickHandler }) => (
  <div className={styles.backdrop} onClick={clickHandler} />
);

export default backdrop;
