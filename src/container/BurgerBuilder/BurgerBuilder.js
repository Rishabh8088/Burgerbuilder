import React, { Component } from "react";
import Auxiliry from "../../hoc/Auxiliry";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";

import axios from "../../axios-orders";

import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import spinner from "../../components/UI/Spinner/Spinner";

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
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://react-burger-app-46eb1.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

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
    const queryParam = [];
    for (let i in this.state.ingredients) {
      queryParam.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParam.push("price=" + this.state.totalPrice);

    const queryString = queryParam.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummery = null;

    let burger = this.state.error ? (
      <p>Can't get ingredients</p>
    ) : (
      <Spinner></Spinner>
    );
    if (this.state.ingredients) {
      burger = (
        <Auxiliry>
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

      orderSummery = (
        <OrderSummery
          ingredients={this.state.ingredients}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
          price={this.state.totalPrice}
        ></OrderSummery>
      );

      if (this.state.loading) {
        orderSummery = <Spinner></Spinner>;
      }
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

export default withErrorHandler(BurgerBuilder, axios);
