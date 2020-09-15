import React, { Fragment } from "react";
import "./../App.css";
import { Link, Redirect, withRouter } from "react-router-dom";
import { getCartItems } from "../actions/cartActions";
import { getWishlistItems } from "../actions/wishlistAcions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTimeout from "react-timeout";
import Logout from "./auth/Logout";

import Sticky from "react-sticky-el";

// import "materialize-css/dist/css/materialize.min.css";

// import M from "materialize-css/dist/js/materialize.min.js";

class Navbar extends React.Component {
  state = {
    gender: "Beds",
    redirect: false,
    wishlistcount: 0,
    cartcount: 0,
  };

  // componentDidMount() {
  //   let sidenav = document.querySelector("#mobile-demo");
  //   M.Sidenav.init(sidenav, {});

  //   style = "transform: translateX(0%)";
  // }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    getCartItems: PropTypes.func.isRequired,
    getWishlistItems: PropTypes.func.isRequired,
    // logout: PropTypes.func.isRequired
  };

  setCart = () => {
    this.props.getCartItems(this.props.auth.user._id);
  };

  setData = () => {
    // console.log(this.props.auth.user._id);
    if (this.props.auth.user) {
      this.props.getWishlistItems(this.props.auth.user._id);
      this.props.setTimeout(this.setCart, 300);
    }

    // this.props.getCartItems(this.props.auth.user._id);
  };
  componentDidMount() {
    this.props.setTimeout(this.setData, 200);
  }

  render() {
    const {
      apparelChange,
      searchword,
      searchfilter,
      searchsubmit,
    } = this.props;

    const { wishlistcount, cartcount } = this.state;

    console.log(window.location.href);

    let route;

    if (
      window.location.href == "http://localhost:3000/home/Women" ||
      window.location.href == "http://localhost:3000/home/Men" ||
      window.location.href == "http://localhost:3000/home/Kids" ||
      window.location.href == "http://localhost:3000/home/Children" ||
      window.location.href == "http://localhost:3000/home/Sofas" ||
      window.location.href == "http://localhost:3000/home/Bookcases" ||
      window.location.href == "http://localhost:3000/home/Chests" ||
      window.location.href == "http://localhost:3000/home/Tv" ||
      window.location.href == "http://localhost:3000/home/Wardrobe" ||
      window.location.href == "http://localhost:3000/home/Bar"
    ) {
      route = "local";
      console.log(route);
    } else {
      route = "other";
      console.log(route);
    }

    let links;

    if (route == "other") {
      links = (
        <Fragment>
          <Link to="/start">
            {" "}
            <img src={require("./img/HomeLogo.png")} alt="smw logo" />
          </Link>
          <nav className="category_nav">
            <ul>
              <Link to="/home/Men" className="link genderlink">
                <li>Chairs</li>
              </Link>
              <Link to="/home/Women" className="link genderlink">
                <li>Tables & Desks</li>
              </Link>
              <Link to="/home/Kids" className="link genderlink">
                <li>Beds</li>
              </Link>
              <Link to="/home/Children" className="link genderlink">
                <li>Children's furniture</li>
              </Link>
              <Link to="/home/Sofas" className="link genderlink">
                <li>Sofas & armchairs</li>
              </Link>
              <Link to="/home/Bookcases" className="link genderlink">
                <li>Bookcases & shelving units</li>
              </Link>
              <Link to="/home/Chests" className="link genderlink">
                <li>Chest of drawers </li>
              </Link>
              <Link to="/home/Tv" className="link genderlink">
                <li>TV & media furniture</li>
              </Link>
              <Link to="/home/Wardrobe" className="link genderlink">
                <li>Wardrobes</li>
              </Link>
              <Link to="/home/Bar" className="link genderlink">
                <li>Bar furniture</li>
              </Link>
            </ul>
          </nav>
          <div className="search">
            <Link to="/start" className="brand-logo">
              <img src={require("./img/HomeLogo.png")} alt="smw logo" />
            </Link>
          </div>
        </Fragment>
      );
    } else if (route == "local") {
      links = (
        <Fragment>
          <Link to="/start">
            <img src={require("./img/HomeLogo.png")} alt="smw logo" />
          </Link>
          <nav className="category_nav">
            <ul>
              <Link to="/home/Men" className="link genderlink">
                <li>Chairs</li>
              </Link>
              <Link to="/home/Women" className="link genderlink">
                <li>Tables & desks</li>
              </Link>
              <Link to="/home/Kids" className="link genderlink">
                <li>Beds</li>
              </Link>
              <Link to="/home/Children" className="link genderlink">
                <li>Children's furniture</li>
              </Link>
              <Link to="/home/Sofas" className="link genderlink">
                <li>Sofas & armchairs</li>
              </Link>
              <Link to="/home/Bookcases" className="link genderlink">
                <li>Bookcases & shelving units</li>
              </Link>
              <Link to="/home/Chests" className="link genderlink">
                <li>Chest of drawers </li>
              </Link>
              <Link to="/home/Tv" className="link genderlink">
                <li>TV & media furniture</li>
              </Link>
              <Link to="/home/Wardrobe" className="link genderlink">
                <li>Wardrobes</li>
              </Link>
              <Link to="/home/Bar" className="link genderlink">
                <li>Bar furniture</li>
              </Link>
            </ul>
          </nav>
          <div className="search">
            <Link to="/start" className="brand-logo">
              <span className=" flow-text">
                <img src={require("./img/HomeLogo.png")} alt="smw logo" />{" "}
              </span>
            </Link>
          </div>
          {/* <div className="search">
            <input
              type="text"
              className="search__input"
              placeholder="Search "
              name="searchquery"
              value={searchword}
              onChange={(e) => searchfilter(e)}
            />
            <div onClick={() => searchsubmit()}>
              <div className="search__button genderlink">
                <img
                  className="user-nav__icon_1"
                  alt="search"
                  src={require("./img/SVG/search.svg")}
                />
              </div>
            </div>
          </div> */}
        </Fragment>
      );
    }

    const { isAuthenticated, user } = this.props.auth;

    // if (this.props.isAuthenticated) {
    //   if (
    //     window.location.href == "http://localhost:3000/home/Women" ||
    //     window.location.href == "http://localhost:3000/home/Men" ||
    //     window.location.href == "http://localhost:3000/home/Kids"
    //   ) {
    //     console.log("ok");
    //   } else {
    //     return <Redirect to="/home/Men" />;
    //   }
    // }

    const authLinks = (
      <Fragment>
        <ul className="sidenav nav_active" id="mobile-demo">
          <li>
            <Link className="link" to="/ShowProfile/">
              <i class="small  material-icons ">assignment_ind</i>
              {this.props.auth.user ? this.props.auth.user.username : null}
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="link genderlink">
              <i class="small  material-icons ">bookmark_border</i>Wishlist
              {this.props.wishlist.length ? (
                <span className="new badge">{this.props.wishlist.length}</span>
              ) : (
                <span></span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/cart" className="link genderlink">
              <i class="small  material-icons ">add_shopping_cart</i>Cart
              {this.props.cart.length ? (
                <span className="new badge">{this.props.cart.length}</span>
              ) : (
                <span></span>
              )}
            </Link>
          </li>
          <li>
            <Link to="#" className="link genderlink">
              <i class="small  material-icons ">exit_to_app</i>
              <Logout />
            </Link>
          </li>

          <li>
            <ul className="collapsible">
              <li>
                <div className="collapsible-header">
                  <i class="small  material-icons ">filter_list</i>Categories
                </div>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/home/Men" className="link genderlink">
                        Chairs
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Women" className="link genderlink">
                        Tables & desks
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Kids" className="link genderlink">
                        Beds
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Children" className="link genderlink">
                        Children's furniture
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Sofas" className="link genderlink">
                        Sofas & armchairs
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Bookcases" className="link genderlink">
                        Bookcases & shelving units
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Chests" className="link genderlink">
                        Chest of drawers
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Tv" className="link genderlink">
                        TV & media furniture
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Wardrobe" className="link genderlink">
                        Wardrobes
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Bar" className="link genderlink">
                        Bar furniture
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
        </ul>

        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <Link to="/start" className="brand-logo">
                <img src={require("./img/HomeLogo.png")} alt="smw logo" />
              </Link>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="navbar_items right hide-on-med-and-down">
                <li>
                  <Link className="link" to="/ShowProfile/">
                    <i class="small material-icons">assignment_ind</i>
                    {this.props.auth.user
                      ? this.props.auth.user.username
                      : null}
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="link genderlink">
                    <i class="small  material-icons ">bookmark_border</i>
                    Wishlist
                    {this.props.wishlist.length ? (
                      <span className="new badge">
                        {this.props.wishlist.length}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="link genderlink">
                    <i class="small  material-icons ">add_shopping_cart</i>Cart
                    {this.props.cart.length ? (
                      <span className="new badge">
                        {this.props.cart.length}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="link genderlink">
                    <Logout />
                  </Link>
                </li>

                <li>
                  <ul className="collapsible">
                    <li>
                      <div className="collapsible-header">
                        <center>
                          <i class="small  material-icons ">filter_list</i>
                          Categories
                        </center>
                      </div>
                      <div className="collapsible-body">
                        <ul>
                          <li>
                            <Link to="/home/Men" className="link genderlink">
                              Chairs
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Women" className="link genderlink">
                              Tables & desks
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Kids" className="link genderlink">
                              Beds
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/home/Children"
                              className="link genderlink"
                            >
                              Children's furniture
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Sofas" className="link genderlink">
                              Sofas & armchairs
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/home/Bookcases"
                              className="link genderlink"
                            >
                              Bookcases & shelving units
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Chests" className="link genderlink">
                              Chest of drawers
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Tv" className="link genderlink">
                              TV & media furniture
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/home/Wardrobe"
                              className="link genderlink"
                            >
                              Wardrobes
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Bar" className="link genderlink">
                              Bar furniture
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <ul className="sidenav nav_active" id="mobile-demo">
          <li>
            <Link to="/login" className="link genderlink">
              <i class="small  material-icons ">account_circle</i>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="link genderlink">
              <i class="small  material-icons ">contact_mail</i>
              Register
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="link genderlink">
              <i class="small  material-icons ">bookmark_border</i>Wishlist
              {this.props.wishlist.length ? (
                <span className="new badge">{this.props.wishlist.length}</span>
              ) : (
                <span></span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/cart" className="link genderlink">
              <i class="small  material-icons ">add_shopping_cart</i>Cart
              {this.props.cart.length ? (
                <span className="new badge">{this.props.cart.length}</span>
              ) : (
                <span></span>
              )}
            </Link>
          </li>
          <li>
            <ul className="collapsible">
              <li>
                <div className="collapsible-header">
                  <i class="small  material-icons ">filter_list</i>Categories
                </div>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/home/Men" className="link genderlink">
                        Chairs
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Women" className="link genderlink">
                        Tables & desks
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Kids" className="link genderlink">
                        Beds
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Children" className="link genderlink">
                        Children's furniture
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Sofas" className="link genderlink">
                        Sofas & armchairs
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Bookcases" className="link genderlink">
                        Bookcases & shelving units
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Chests" className="link genderlink">
                        Chest of drawers
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Tv" className="link genderlink">
                        TV & media furniture
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Wardrobe" className="link genderlink">
                        Wardrobes
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/Bar" className="link genderlink">
                        Bar furniture
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <Link to="/start" className="brand-logo">
                <span className=" flow-text">
                  <img src={require("./img/HomeLogo.png")} alt="smw logo" />
                </span>
              </Link>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="navbar_items right hide-on-med-and-down">
                <li>
                  <Link to="/login" className="link genderlink">
                    <i class="small  material-icons ">account_circle</i>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="link genderlink">
                    <i class="small  material-icons ">contact_mail</i>
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="link genderlink">
                    <i class="small  material-icons ">bookmark_border</i>{" "}
                    Wishlist
                    {this.props.wishlist.length ? (
                      <span className="new badge">
                        {this.props.wishlist.length}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="link genderlink">
                    <i class="small  material-icons ">add_shopping_cart</i>Cart
                    {this.props.cart.length ? (
                      <span className="new badge">
                        {this.props.cart.length}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </Link>
                </li>

                <li>
                  <ul className="collapsible">
                    <li>
                      <div className="collapsible-header">
                        <i class="small  material-icons ">filter_list</i>
                        Categories
                      </div>
                      <div className="collapsible-body">
                        <ul>
                          <li>
                            <Link to="/home/Men" className="link genderlink">
                              Chairs
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Women" className="link genderlink">
                              Tables & desks
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Kids" className="link genderlink">
                              Beds
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/home/Children"
                              className="link genderlink"
                            >
                              Children's furniture
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Sofas" className="link genderlink">
                              Sofas & armchairs
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/home/Bookcases"
                              className="link genderlink"
                            >
                              Bookcases & shelving units
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Chests" className="link genderlink">
                              Chest of drawers
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Tv" className="link genderlink">
                              TV & media furniture
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/home/Wardrobe"
                              className="link genderlink"
                            >
                              Wardrobes
                            </Link>
                          </li>
                          <li>
                            <Link to="/home/Bar" className="link genderlink">
                              Bar furniture
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </Fragment>
    );

    return <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  wishlist: state.wishlist.wishlists,
  cart: state.cart.carts,
});

export default ReactTimeout(
  connect(mapStateToProps, {
    getCartItems,
    getWishlistItems,
  })(Navbar)
);
