import React from "react";

import * as styles from "./sideDrawer.module.scss";

import Link from "@reach/router";
import Links from "components/navigation/links/links";
interface OwnProps {
  open: boolean;
  closeDrawerClick: () => void;
}
interface StateProps {}
interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps;

const sideDrawer: React.FunctionComponent<Props> = ({
  open,
  closeDrawerClick
}) => {
  let drawerClasses = [styles.sideDrawer];

  const [firstOpen, setFirstOpen] = React.useState(false);
  if (open) {
    drawerClasses.push(styles.open);
    drawerClasses.push(styles.animated);
    if (!firstOpen) {
      setFirstOpen(true);
    }
  }
  if (firstOpen) {
    drawerClasses.push(styles.animated);
  }

  return (
    <nav className={drawerClasses.join(" ")}>
      <div className={styles.cross} onClick={closeDrawerClick} />
      <Links />
    </nav>
  );
};

export default sideDrawer;
