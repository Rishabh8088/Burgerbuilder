import * as actionType from "./actionType";

import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredient = ingredient => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredient
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionType.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios
      .get("https://react-burger-app-46eb1.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredient(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientFailed());
      });
  };
};
