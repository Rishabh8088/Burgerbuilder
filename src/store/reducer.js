import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  meat: 1,
  bacon: 2,
  cheese: 3
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // copy of state and this is ES6 syntex
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // copy of state and this is ES6 syntex
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },

        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
      };
    default:
      return state;
  }
  return state;
};

export default reducer;
