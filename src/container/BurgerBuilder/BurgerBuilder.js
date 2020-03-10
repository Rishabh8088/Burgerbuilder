import React, { Component } from "react";

import { connect } from "react-redux";

import Auxiliry from "../../hoc/Auxiliry";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";

import axios from "../../axios-orders";

import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import spinner from "../../components/UI/Spinner/Spinner";

import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // Because we haven't learnt async call using redux
    // axios
    //   .get("https://react-burger-app-46eb1.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
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

  // This can be removed as we are handling this inside redux (reducer.js)

  // addIngredientHander = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];

  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchasableState(updatedIngredients);
  // };

  // removeIngredientHander = type => {
  //   const oldCount = this.state.ingredients[type];

  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;

  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeducted = INGREDIENT_PRICE[type];

  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeducted;

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchasableState(updatedIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // this will be managed by redux store here we will only do navigation

    // const queryParam = [];
    // for (let i in this.state.ingredients) {
    //   queryParam.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParam.push("price=" + this.state.totalPrice);

    // const queryString = queryParam.join("&");

    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });

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

    let burger = this.state.error ? (
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: igName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: igName }),
    onIngredientRemoved: igName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
