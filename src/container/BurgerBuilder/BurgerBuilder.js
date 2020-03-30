import React, { Component } from "react";

import { connect } from "react-redux";

import Auxiliry from "../../hoc/Auxiliry";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";

import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import spinner from "../../components/UI/Spinner/Spinner";

import * as burgerBuilderAction from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    purchasing: false
  };

  componentDidMount() {
    // Because we haven't learnt async call using redux
    this.props.onInitIngredient();
  }

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKeys => {
        return ingredients[igKeys];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = {
      // Redux set value
      ...this.props.ings
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummery = null;

    let burger = this.props.error ? (
      <p>Can't get ingredients</p>
    ) : (
      <Spinner></Spinner>
    );
    if (this.props.ings) {
      burger = (
        <Auxiliry>
          <Burger ingredients={this.props.ings}>Burger</Burger>
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disable={disableInfo}
            price={this.props.price}
            purchasable={this.updatePurchasableState(this.props.ings)}
            ordered={this.purchaseHandler}
          ></BuildControls>
        </Auxiliry>
      );

      orderSummery = (
        <OrderSummery
          ingredients={this.props.ings}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
          price={this.props.price}
        ></OrderSummery>
      );

      // if (this.state.loading) {
      //   orderSummery = <Spinner></Spinner>;
      // }
    }

    return (
      <Auxiliry>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummery}
        </Modal>
        {burger}
      </Auxiliry>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: igName =>
      dispatch(burgerBuilderAction.addIngredient(igName)),
    onIngredientRemoved: igName =>
      dispatch(burgerBuilderAction.removeIngredient(igName)),
    onInitIngredient: () => dispatch(burgerBuilderAction.initIngredient()),

    onInitPurchase: () => dispatch(burgerBuilderAction.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
