import React, { Component } from "react";
import Order from "../../components/Order/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder();
  }

  render() {
    let orders = <Spinner></Spinner>;

    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        ></Order>
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapDispatchTOProps = dispatch => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrder())
  };
};

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchTOProps
)(withErrorHandler(Orders, axios));
