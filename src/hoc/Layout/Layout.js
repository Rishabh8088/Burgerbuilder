import React, { Component } from "react";
import Auxiliry from "../Auxiliry";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleClicked = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Auxiliry>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleClicked}></Toolbar>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        ></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliry>
    );
  }
}

export default Layout;
