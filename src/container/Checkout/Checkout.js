import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummery from "../../components/Order/CheckoutSummery/CheckoutSummery";
import ContactData from "./ContactData/ContactData";

import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summery = <Redirect to="/"></Redirect>;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/"></Redirect>
      ) : null;
      summery = (
        <div>
          {purchasedRedirect}
          <CheckoutSummery
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          ></CheckoutSummery>
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
            // component={ContactData}
          ></Route>
        </div>
      );
    }
    return summery;
  }
}

const mapStateToProps = state => {
  return {
    //ings any name of ur choice : from reducer.js state.ingredients
    ings: state.burgerBuilder.ingredients,
    purchased: state.orders.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
