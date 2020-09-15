import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getWishlistItems,
  deleteWishlistItems,
  movetoCart,
  cartCount,
} from "../../actions/wishlistAcions";

import WishlistCard from "../WishlistCard";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ReactTimeout from "react-timeout";

import { Link, Redirect, withRouter } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

class WishListPage extends React.Component {
  state = {
    reload: false,
  };
  setData = () => {
    // console.log(this.props.auth.user._id);
    if (this.props.auth.user) {
      this.props.getWishlistItems(this.props.auth.user._id);
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
  }

  onDeleteClick = (id) => {
    this.props.deleteWishlistItems(id);
  };

  move = (id) => {
    this.props.movetoCart(id);
    // this.props.cartCount(id);
  };

  render() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
    const wishlistItems = this.props.wishlists;
    if (!this.props.auth.isAuthenticated && this.state.reload) {
      return <Redirect to="/start" />;
    }
    return (
      <div>
        <Navbar />
        <div className="row" style={{ minHeight: "63vh" }}>
          {wishlistItems.length ? (
            <div>
              {wishlistItems
                ? wishlistItems.map((dress) =>
                    dress.wishlistid ? (
                      <div key={dress.wishlistid}>
                        {/* <WishlistCard
                          dress={dress.dress}
                          wishlist={dress}
                          user={this.props.auth}
                          deleteitem={this.onDeleteClick}
                          moveitem={this.move}
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
                                <button
                                  className="btn  btn-small col s10 margin_top_1"
                                  onClick={() => this.move(dress.wishlistid)}
                                >
                                  Move to Cart
                                </button>
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
                                    this.onDeleteClick(dress.wishlistid)
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
                  Your Wishlist is empty
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

const mapStateToProps = (state) => ({
  wishlists: state.wishlist.wishlists,
  auth: state.auth,
});

export default ReactTimeout(
  connect(mapStateToProps, {
    getWishlistItems,
    deleteWishlistItems,
    movetoCart,
    cartCount,
  })(WishListPage)
);
