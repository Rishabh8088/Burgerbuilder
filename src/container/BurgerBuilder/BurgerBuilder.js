import React, { Component } from "react";
import Auxiliry from "../../hoc/Auxiliry";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";

import Modal from "../../components/UI/Modal/Modal";

const INGREDIENT_PRICE = {
  salad: 0.5,
  meat: 1,
  bacon: 2,
  cheese: 3
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKeys => {
        return ingredients[igKeys];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHander = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasableState(updatedIngredients);
  };

  removeIngredientHander = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeducted = INGREDIENT_PRICE[type];

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeducted;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasableState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You Continue");
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Auxiliry>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummery
            ingredients={this.state.ingredients}
            purchaseContinue={this.purchaseContinueHandler}
            purchaseCancel={this.purchaseCancelHandler}
            price={this.state.totalPrice}
          ></OrderSummery>
        </Modal>
        <Burger ingredients={this.state.ingredients}>Burger</Burger>
        <BuildControls
          ingredientsAdded={this.addIngredientHander}
          ingredientRemove={this.removeIngredientHander}
          disable={disableInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        ></BuildControls>
      </Auxiliry>
    );
  }
}

export default BurgerBuilder;
