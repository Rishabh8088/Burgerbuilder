import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliry from "../Auxiliry";

const withErrorHandler = (WrapComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      console.log(
        "withErrorHandler.js ComponentWillUnmount",
        this.reqInterceptors,
        this.resInterceptors
      );
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxiliry>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapComponent {...this.props}></WrapComponent>;
        </Auxiliry>
      );
    }
  };
};

export default withErrorHandler;
