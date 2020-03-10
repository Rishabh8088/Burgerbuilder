import React, { Component } from "react";

import axios from "../../../../src/axios-orders";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          require: true
        },
        valid: false,
        touch: false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          require: true
        },
        valid: false,
        touch: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          require: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touch: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          require: true
        },
        valid: false,
        touch: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",

        validation: {
          require: true
        },
        valid: false,
        touch: false
      },
      delivryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest"
            },
            {
              value: "cheapest",
              displayValue: "Cheapest"
            }
          ]
        },
        validation: {},
        // just for default value if we don't change value
        value: "fastest",
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  checkValidityHandler(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.require) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // Till here only shallow copy
    const updateOrderForm = {
      ...this.state.orderForm
    };

    // Deep copying
    const updatedFormElement = { ...updateOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidityHandler(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touch = true;

    updateOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
    }

    console.log(formIsValid);
    this.setState({ orderForm: updateOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touch}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          ></Input>
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactData);
