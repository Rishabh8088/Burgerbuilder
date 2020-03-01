import React, { Component } from "react";

import Auxiliry from "../../../hoc/Auxiliry";
import Button from "../../UI/Button/Button";

class OrderSummery extends Component {
  componentWillUpdate() {
    console.log("Order Summery Update");
  }

  render() {
    const ingredientSummery = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Auxiliry>
        <h3> Your Order </h3>
        <p> A delicious Burger with following ingredients </p>
        <ul> {ingredientSummery} </ul> <p> Continue to checkout ? </p>
        <p>
          <strong>Total Price :$</strong>{" "}
          <span>{this.props.price.toFixed(2)}</span>
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </Auxiliry>
    );
  }
}

export default OrderSummery;
