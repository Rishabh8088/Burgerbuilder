import React from "react";

import classes from "./SideDrawer.css";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliry from "../../../hoc/Auxiliry";

const sideDrawer = props => {
  //.. Some logic

  let attachClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Auxiliry>
      <Backdrop show={props.open} clicked={props.closed}></Backdrop>
      <div className={attachClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo></Logo>
        </div>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Auxiliry>
  );
};

export default sideDrawer;
