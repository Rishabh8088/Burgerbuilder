import React, { Component } from "react";
import classes from "../Modal/Modal.css";
import Auxiliry from "../../../hoc/Auxiliry";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    console.log("Modal will update ");
  }

  render() {
    return (
      <div>
        <Auxiliry>
          <Backdrop
            show={this.props.show}
            clicked={this.props.modalClosed}
          ></Backdrop>
          <div
            className={classes.Modal}
            style={{
              transform: this.props.show
                ? "translateY(0)"
                : "translateY(-1000vh)",
              opacity: this.props.show ? 1 : 0
            }}
          >
            {this.props.children}
          </div>
        </Auxiliry>
      </div>
    );
  }
}

export default Modal;
