import React, { Component } from "react";

import axios from "../../../../src/axios-orders";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "rishabh",
        address: {
          street: "Vishnoi Mandir",
          zipCode: "411014",
          country: "India"
        },
        email: "rsoni8088@gmail.com"
      },
      delivryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder=" Name"
        ></input>
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Email"
        ></input>
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        ></input>
        <input
          className={classes.Input}
          type="text"
          name="postal code"
          placeholder="postal code"
        ></input>
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner></Spinner>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
