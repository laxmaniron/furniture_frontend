import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Card from "react-credit-cards";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCartItems, deleteCartItems } from "../../actions/cartActions";
import CartCard from "../CartCard";
import PayCard from "./PayCard";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ReactTimeout from "react-timeout";
import { Link, Redirect, withRouter } from "react-router-dom";
import { addAddress } from "../../actions/authActions";
import { getCardItems, addtoCard } from "../../actions/cardActions";
import { getOrderItems, addtoOrder } from "../../actions/orderActions";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

// import "./styles.css";

import "react-credit-cards/es/styles-compiled.css";

import M from "materialize-css/dist/js/materialize.min.js";

class paySmartComponent extends Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
    addressAdd: "",
    pincodeAdd: "",
    reload: false,
    addressforpayment: "",
  };

  setData = () => {
    this.props.getCartItems(this.props.auth.user._id);
    this.props.getCardItems(this.props.auth.user._id);
    this.props.getOrderItems(this.props.auth.user._id);
    this.setState({ reload: true });
  };

  componentDidMount() {
    this.props.setTimeout(this.setData, 300);
    //     document.addEventListener("DOMContentLoaded", function () {
    //   var elem = document.querySelector(".sidenav");
    //   var instance = new M.Sidenav(elem);
    // });
    let sidenav = document.querySelector("#mobile-demo");
    M.Sidenav.init(sidenav, {});

    var cols = document.getElementsByClassName("sidenav-overlay");
    for (var i = 0; i < cols.length; i++) {
      cols[i].style.display = "none";
      cols[i].style.opacity = 0;
    }

    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, {});

    // style="transform: translateX(0%)"
  }

  onChangeAddress = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmitAddress = () => {
    const newAddress = {
      user: this.props.auth.user,
      address: this.state.addressAdd,
      pincode: this.state.pincodeAdd,
    };
    this.props.addAddress(newAddress);
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    const cardinfo = {
      cardNumber: this.state.number,
      name: this.state.name,
      expirydate: this.state.expiry,
      cvv: this.state.cvc,
    };

    this.props.addtoCard(cardinfo, this.props.auth.user);

    this.setState({ formData });

    this.form.reset();
  };

  finalPay = (total) => {
    const finalamount = total - Math.floor(total / 10);

    console.log(finalamount);
    console.log(this.props.auth.user);
    console.log(this.state.addressforpayment);

    const body = {
      user: this.props.auth.user,
      cost: finalamount,
      address: this.state.addressforpayment,
    };

    this.props.addtoOrder(body);
  };
  start;
  render() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
    const {
      name,
      number,
      expiry,
      cvc,
      focused,
      issuer,
      formData,
      addressAdd,
      pincodeAdd,
    } = this.state;

    const cartItems = this.props.carts;
    let total = 0;

    if (!this.props.auth.isAuthenticated && this.state.reload) {
      return <Redirect to="/home/Men" />;
    }

    if (cartItems.length > 0) {
      for (var i = 0; i < cartItems.length; i++) {
        console.log("hi cart");
        if (cartItems[i].cartid) {
          total += parseInt(cartItems[i].dress.price.replace(",", ""));
        }
      }
    }

    const { user } = this.props.auth;

    return (
      <div>
        <Navbar />
        <div>
          <div>
            <div>
              <div
                class=" login_form row container center-align"
                style={{ margin: "auto", marginTop: "0.5rem" }}
              >
                <h5 className="col s9 offset-s2 primary-text">
                  Checkout Details
                </h5>

                <div class=" col s12 offset-s1">
                  {user
                    ? user.Address.map((place, index) => (
                        <div key={index} className="row">
                          <div className="input-field col s8 m4 ">
                            <label htmlFor={index}>
                              <input
                                class="with-gap"
                                style={{ display: "none" }}
                                type="radio"
                                onChange={this.onChangeAddress}
                                id={index}
                                name="addressforpayment"
                                value={`${place}  ${user.pincode[index]}`}
                              />

                              <span>
                                {`${place}      ${user.pincode[index]}`}
                              </span>
                            </label>
                          </div>
                        </div>
                      ))
                    : null}

                  <div className="row">
                    <div class="input-field col s8 m4 ">
                      <input
                        type="text"
                        name="addressAdd"
                        value={addressAdd}
                        onChange={this.onChangeAddress}
                        id="idplace"
                      />
                      <label htmlFor="idplace">Address</label>
                    </div>
                  </div>
                  {/* <div className="row">
                  <input
                    type="text"
                    name="pincodeAdd"
                    value={pincodeAdd}
                    onChange={this.onChangeAddress}
                    placeholder="pincode"
                  />
                </div> */}

                  <div className="row">
                    <div class="input-field col s8 m4 ">
                      <input
                        type="text"
                        name="pincodeAdd"
                        value={pincodeAdd}
                        onChange={this.onChangeAddress}
                        id="pincode"
                      />
                      <label htmlFor="pincode">Pincode</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6 offset-s2">
                      <button
                        className="btn waves-effect waves-light"
                        onClick={this.onSubmitAddress}
                      >
                        Add Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="row">
                  {this.props.cards
                    ? this.props.cards.map((card) => (
                        <div key={card._id}>
                          <label htmlFor={card._id}>
                            <input
                              type="radio"
                              name="cardforpayment"
                              class="with-gap"
                              style={{ display: "none" }}
                              id={card._id}
                            />

                            <span
                              style={{ transform: "translateY(3rem)" }}
                            ></span>
                            <span>
                              <Card
                                number={card.cardNumber}
                                name={card.name}
                                expiry={card.expirydate}
                                cvc={card.cvv}
                                // focused={focused}
                              />
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                </div>

                <div>
                  <Card
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focused}
                    callback={this.handleCallback}
                  />
                </div>

                <div
                  class=" login_form row container center-align"
                  style={{ margin: "auto" }}
                >
                  <form
                    ref={(c) => (this.form = c)}
                    onSubmit={this.handleSubmit}
                    class=" col s12 offset-s1"
                  >
                    <div className="row">
                      <div class="input-field col s8 m4 ">
                        <input
                          type="tel"
                          name="number"
                          pattern="[\d| ]{16,22}"
                          required
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                          id="card_number"
                        />
                        <label htmlFor="card_number">Card Number</label>
                      </div>
                    </div>

                    <div className="row">
                      <div class="input-field col s8 m4 ">
                        <input
                          type="text"
                          name="name"
                          required
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                          id="card_name"
                        />
                        <label htmlFor="card_name">Name</label>
                      </div>
                    </div>

                    <div className="row">
                      <div class="input-field col s8 m4 ">
                        <input
                          type="tel"
                          name="expiry"
                          pattern="\d\d/\d\d"
                          required
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                          id="card_expiry"
                        />
                        <label htmlFor="card_expiry">Valid Thru</label>
                      </div>
                    </div>
                    <div className="row">
                      <div class="input-field col s8 m4 ">
                        <input
                          type="tel"
                          name="cvc"
                          pattern="\d{3}"
                          required
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                          id="card_cvc"
                        />
                        <label htmlFor="card_cvc">CVC</label>
                      </div>
                    </div>

                    <input type="hidden" name="issuer" value={issuer} />
                    {/* <div>
                      <button className="btn">Add Card</button>
                    </div> */}

                    <div className="row">
                      <div className="input-field col s6 offset-s2">
                        <button className="btn waves-effect waves-light">
                          Add Card
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div>
              {/* <div>
                <h1> Details</h1>
              </div>
              <div>
                {cartItems
                  ? cartItems.map((dress) =>
                      dress.cartid ? (
                        <div key={dress.cartid}>
                          <PayCard
                            dress={dress.dress}
                            cart={dress}
                            user={this.props.auth}
                            deleteitem={this.onDeleteClick}
                          />
                        </div>
                      ) : null
                    )
                  : null}
              </div>
              <div>
                <div>
                  <div>Final Price</div>
                  <div> &#8377; &nbsp;{total - Math.floor(total / 10)} </div>
                </div>
                <Link to="/orders">
                  <button onClick={this.finalPay.bind(this, total)}>
                    Purchase
                  </button>
                </Link>
              </div> */}

              <div className="row" style={{ width: "100%" }}>
                <div class="col s12 m6">
                  <div class="card white">
                    <div class="card-content black-text ">
                      <span class="card-title">Order Details</span>
                      <div>
                        <div className="row">
                          {cartItems
                            ? cartItems.map((dress) =>
                                dress.cartid ? (
                                  <div className="col s3" key={dress.cartid}>
                                    <PayCard
                                      dress={dress.dress}
                                      cart={dress}
                                      user={this.props.auth}
                                      deleteitem={this.onDeleteClick}
                                    />
                                  </div>
                                ) : null
                              )
                            : null}
                        </div>
                        {/* <div style={{ fontSize: "1.2rem" }}>
                          Discount &emsp; &#8377; {Math.floor(total / 10)}
                        </div>

                        <div style={{ fontSize: "1.2rem" }}>
                          Final Price &emsp; &#8377;
                          {total - Math.floor(total / 10)}
                        </div> */}
                      </div>
                    </div>

                    <div style={{ fontSize: "1.2rem" }}>
                      &emsp; Final Price &emsp; &#8377;
                      {total - Math.floor(total / 10)}
                    </div>

                    <div class="card-action">
                      <Link to="/orders">
                        <button
                          className="btn"
                          onClick={this.finalPay.bind(this, total)}
                        >
                          Purchase
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* cartItems.map(dress =>
                    dress.cartid ? (
                      <div key={dress.cartid}>
                        <CartCard
                          dress={dress.dress}
                          cart={dress}
                          user={this.props.auth}
                          deleteitem={this.onDeleteClick}
                        />
                      </div>
                    ) : null
                  ) */}

        <Footer />
      </div>
    );
  }
}

paySmartComponent.propTypes = {
  getCartItems: PropTypes.func.isRequired,
  carts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  carts: state.cart.carts,
  auth: state.auth,
  cards: state.card.cards,
  orders: state.order.orders,
});

export default ReactTimeout(
  connect(mapStateToProps, {
    getCartItems,
    deleteCartItems,
    addAddress,
    getCardItems,
    addtoCard,
    getOrderItems,
    addtoOrder,
  })(paySmartComponent)
);

{
  /* <div className="row">
<div class="col s12 m6">
  <div class="card white">
    <div class="card-content black-text ">
      <span class="card-title">Price details</span>
      <p>
        <div style={{ fontSize: "1.2rem" }}>
          Cart Total &emsp; &#8377;{total}
        </div>
        <div style={{ fontSize: "1.2rem" }}>
          Discount &emsp; &#8377; {Math.floor(total / 10)}
        </div>

        <div style={{ fontSize: "1.2rem" }}>
          Final Price &emsp; &#8377;
          {total - Math.floor(total / 10)}
        </div>
      </p>
    </div>
    <div class="card-action">
      <Link to="/pay" className="btn">
        Proceed to checkout
      </Link>
    </div>
  </div>
</div>
</div> */
}
