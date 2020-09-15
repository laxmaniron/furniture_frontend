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
import { getOrderItems, addtoOrder } from "../../actions/orderActions";

import M from "materialize-css/dist/js/materialize.min.js";

class Orders extends React.Component {
  state = {
    reload: false,
  };
  setData = () => {
    // console.log(this.props.auth.user._id);
    if (this.props.auth.user) {
      this.props.getOrderItems(this.props.auth.user._id);
    }

    this.setState({ reload: true });
  };
  componentDidMount() {
    this.props.setTimeout(this.setData, 300);

    let sidenav = document.querySelector("#mobile-demo");
    M.Sidenav.init(sidenav, {});

    var cols = document.getElementsByClassName("sidenav-overlay");
    for (var i = 0; i < cols.length; i++) {
      cols[i].style.display = "none";
      cols[i].style.opacity = 0;
    }

    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, {});
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
    const orderItems = this.props.orders;
    if (!this.props.auth.isAuthenticated && this.state.reload) {
      return <Redirect to="/home/Men" />;
    }
    return (
      <div>
        <Navbar />
        {/* <div>
          <div>
            {orderItems
              ? orderItems.map((dress) =>
                  dress._id ? (
                    <div key={dress._id}>
                      Ordered &nbsp; on &nbsp; {dress.ordered_date}
                      <br />
                      Expected &nbsp; Delivery &nbsp; on &nbsp;
                      {dress.expected_delivery}
                    </div>
                  ) : null
                )
              : null}
          </div>

          <div>
            <Link to="/start">
              <button className="btn">Continue Shopping</button>
            </Link>
          </div>  </div>*/}

        <div className="row">
          <div class="col s12 m6">
            <div class="card white">
              <div class="card-content black-text ">
                <span class="card-title">Ordered on 25/07/2020</span>
                <p>
                  <div style={{ fontSize: "1.2rem" }}>
                    <p> 1 ADDE Sofaset</p>
                    <p> 2 BUNSO Chairs</p>
                  </div>

                  <div style={{ fontSize: "1.2rem" }}>Price &#8377;50,040</div>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div class="col s12 m6">
            <div class="card white">
              <div class="card-content black-text ">
                <span class="card-title">Ordered on 24/07/2020</span>
                <p>
                  <div style={{ fontSize: "1.2rem" }}>
                    <p> 1 EDELA Bar Chairs</p>
                    <p> 2 FLISAT Wardrobe</p>
                  </div>

                  <div style={{ fontSize: "1.2rem" }}>Price &#8377;35,250</div>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div class="col s12 m6">
            <div class="card white">
              <div class="card-content black-text ">
                <span class="card-title">Ordered on 23/07/2020</span>
                <p>
                  <div style={{ fontSize: "1.2rem" }}>
                    <p> 1 HILLARED Chest Drawers</p>
                    <p> 2 JULES Table Drawers</p>
                  </div>

                  <div style={{ fontSize: "1.2rem" }}>Price &#8377;70,300</div>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div class="col s12 m6">
            <div class="card white">
              <div class="card-content black-text ">
                <span class="card-title">Ordered on 22/07/2020</span>
                <p>
                  <div style={{ fontSize: "1.2rem" }}>
                    <p> 2 LYNNI Sofaset</p>
                    <p> 1 NISSE Tableset</p>
                    <p> 1 ODGER Children chairs</p>
                    <p> 2 PELLE Tv Cupboard</p>
                  </div>

                  <div style={{ fontSize: "1.2rem" }}>
                    Price &#8377; 1,30,040
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div class="col s12 m6">
            <div class="card white">
              <div class="card-content black-text ">
                <span class="card-title">Ordered on 21/07/2020</span>
                <p>
                  <div style={{ fontSize: "1.2rem" }}>
                    <p> 1 STIG Bed</p>
                    <p> 2 TORPARO BookShelf</p>
                  </div>

                  <div style={{ fontSize: "1.2rem" }}>Price &#8377;75,060</div>
                </p>
              </div>
              <div class="card-action">
                <Link to="/start" className="btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wishlists: state.wishlist.wishlists,
  auth: state.auth,
  orders: state.order.orders,
});

export default ReactTimeout(
  connect(mapStateToProps, {
    getWishlistItems,
    deleteWishlistItems,
    movetoCart,
    cartCount,
    getOrderItems,
  })(Orders)
);
