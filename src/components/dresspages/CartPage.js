import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCartItems, deleteCartItems } from "../../actions/cartActions";
import CartCard from "../CartCard";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ReactTimeout from "react-timeout";
// import { Link, Redirect, withRouter } from "react-router-dom";

import { Link, Redirect, withRouter } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

class CartPage extends Component {
  state = {
    reload: false,
  };

  setData = () => {
    if (this.props.auth.user) {
      this.props.getCartItems(this.props.auth.user._id);
    }

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

    // window.location.reload();
  }

  onDeleteClick = (id) => {
    this.props.deleteCartItems(id);
  };
  render() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
    const cartItems = this.props.carts;
    let total = 0;

    if (!this.props.auth.isAuthenticated && this.state.reload) {
      return <Redirect to="/start" />;
    }

    if (cartItems.length > 0) {
      for (var i = 0; i < cartItems.length; i++) {
        // console.log(cartItems);
        if (cartItems[i].cartid) {
          total += parseInt(cartItems[i].dress.price.replace(",", ""));
        }
      }
    }
    return (
      <div className="row">
        <Navbar />
        <div style={{ minHeight: "63vh" }}>
          {/* <div className="row"> */}
          {cartItems.length ? (
            <div>
              {cartItems
                ? cartItems.map((dress) =>
                    dress.cartid ? (
                      <div key={dress.cartid}>
                        {/* <CartCard
                            dress={dress.dress}
                            cart={dress}
                            user={this.props.auth}
                            deleteitem={this.onDeleteClick}
                          /> */}

                        <div className="col s6 m6">
                          <div className="card">
                            <div className="card-image">
                              <Link to={`/DressMainPage/${dress.dress._id}`}>
                                <img
                                  className="responsive-img"
                                  style={{ width: "100%", height: "auto" }}
                                  src={dress.dress.cover_photo}
                                />
                              </Link>
                              <span className="card-title" />
                            </div>
                            <div className="card-content">
                              <div>
                                <p>
                                  <b>{dress.dress.brand.split("/")[0]}</b>
                                </p>
                                <p
                                  style={{ height: "11vh" }}
                                  className="flow-text"
                                >
                                  {dress.dress.name}
                                </p>
                                <p>
                                  <b>Rs.&nbsp;{dress.dress.price}</b>
                                </p>
                              </div>
                              <div className="row">
                                <style>
                                  {`
  .btnchange {
    background-color: #424242  !important;
  }
        `}
                                </style>
                                <button
                                  className="btn btn-small col s10 margin_top_1 btnchange"
                                  onClick={() =>
                                    this.onDeleteClick(dress.cartid)
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )
                : null}

              <div className="row">
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
              </div>
            </div>
          ) : (
            <div
              className=" login_form row container center-align"
              style={{ margin: "auto" }}
            >
              <div className="row">
                <h5
                  className="col s12 offset-s2 primary-text left-align"
                  style={{ color: "black" }}
                >
                  Your Cart is empty
                </h5>
              </div>
              <Link to="/start">
                <button className="btn push-s4">Continue Shopping</button>
              </Link>
            </div>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}

CartPage.propTypes = {
  getCartItems: PropTypes.func.isRequired,
  carts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  carts: state.cart.carts,
  auth: state.auth,
});

export default ReactTimeout(
  connect(mapStateToProps, { getCartItems, deleteCartItems })(CartPage)
);

{
  /* <div className="Cart__page__content__right">
                <div className="Cart__page__content__right__header">
                  <h1> Price details</h1>
                </div>
                <div className="Cart__page__content__right__items">
                  <div>Cart Total</div>
                  <div> &#8377; &nbsp; {total}</div>
                </div>
                <div className="Cart__page__content__right__items">
                  <div>Discount</div>
                  <div> &#8377; &nbsp; {Math.floor(total / 10)}</div>
                </div>
                <div className="Cart__page__content__right__items">
                  <div>Delivery</div>
                  <div>
                    {" "}
                    <del className="red">&#8377; &nbsp; 125 </del> &nbsp;{" "}
                    <span className="green">FREE</span>
                  </div>
                </div>

                <div className="Cart__page__content__right__items">
                  <div>Final Price</div>
                  <div className="green">
                    {" "}
                    &#8377; &nbsp;{total - Math.floor(total / 10)}{" "}
                  </div>
                </div>
                <div className="Cart__page__content__right__items">
                  <Link to="/pay" className="btn btn--large btn--pink">
                    Proceed to checkout
                  </Link>
                </div>
              </div> */
}
