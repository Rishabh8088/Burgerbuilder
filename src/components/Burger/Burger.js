import React from "react";
//import { withRouter } from "react-router-dom";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  console.log("Burger" + props);
  let transformedIngredient = Object.keys(props.ingredients) //
    .map(igKeys => {
      return [...Array(props.ingredients[igKeys])].map((_, i) => {
        return (
          <BurgerIngredient key={igKeys + i} type={igKeys}></BurgerIngredient>
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredient.length === 0) {
    transformedIngredient = <div>Please enter some ingredients</div>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

// export default withRouter(burger);
export default burger;
