import React, { Component, Fragment } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from 'uuid';
import { connect } from "react-redux";
import { getDresses } from "../actions/dressActions";
import { addtoCart } from "../actions/cartActions";
import { addtoWishlist } from "../actions/wishlistAcions";
import Pagination from "./Pagination";
import PropTypes from "prop-types";
import Card from "./Card";
import { Link, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Popup from "./Popup";

import { createMessage } from "../actions/messages";

// import "./dresses.css";
import M from "materialize-css/dist/js/materialize.min.js";

class SofaPage extends Component {
  state = {
    totalResults: 0,
    currentPage: 1,
    nextpage: null,
    gender: "Sofas & armchairs",
    brand: [],
    category: [],
    color: [],
    discount: {
      "10% and above": null,
      "20% and above": null,
      "30% and above": null,
      "40% and above": null,
      "50% and above": null,
    },
    toggler: true,
    searchquery: "search",
    limit: 20,
    colorSet: {
      Black: 0,
      Brown: 0,
      Beige: 0,
      Grey: 0,
      White: 0,
      Blue: 0,
      Navy: 0,
      Green: 0,
      Olive: 0,
      Red: 0,
      Pink: 0,
      Orange: 0,
      Melange: 0,
    },
    maindisc: -1,
    "10% and above": null,
    "20% and above": null,
    "30% and above": null,
    "40% and above": null,
    "50% and above": null,
    htol: null,
    ltoh: null,
    branddisplay: "none",
    brandZindex: "-1000",
    categorydisplay: "none",
    categoryZindex: "-1000",
  };

  async componentDidMount() {
    let sidenav = document.querySelector("#mobile-demo");
    M.Sidenav.init(sidenav, {});

    var cols = document.getElementsByClassName("sidenav-overlay");
    for (var i = 0; i < cols.length; i++) {
      cols[i].style.display = "none";
      cols[i].style.opacity = 0;
    }

    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, {});

    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {});

    const page = 1;
    // const { gender } = this.props.match.params;
    let gender = "Sofas & armchairs";
    console.log(gender);
    const { limit, brand, category, color, maindisc, searchquery } = this.state;
    await this.props.getDresses(
      page,
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery
    );
  }

  paginate = async (pageNumber) => {
    const {
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery,
    } = this.state;
    await this.props.getDresses(
      pageNumber,
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery
    );

    this.setState({ currentPage: pageNumber, toggler: !this.state.toggler });
  };

  brandFilter = (e, brandin) => {
    e.preventDefault();
    // console.log(e);
    // console.log(e.target);
    let {
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery,
    } = this.state;

    const page = 1;

    if (brand.length == 0) {
      brand = [];
      brand.push(brandin);
      this.props.getDresses(
        page,
        limit,
        gender,
        brand,
        category,
        color,
        maindisc,
        searchquery
      );
      this.setState({ brand: brand });
    } else {
      if (brand.includes(brandin)) {
        for (var i = 0; i < brand.length; i++) {
          if (brand[i] == brandin) {
            console.log("hi in it");
            brand.splice(i, 1);

            console.log(brand);
            this.props.getDresses(
              page,
              limit,
              gender,
              brand,
              category,
              color,
              maindisc,
              searchquery
            );
            this.setState({ brand: brand });
          }
        }
      } else {
        brand.push(brandin);
        this.props.getDresses(
          page,
          limit,
          gender,
          brand,
          category,
          color,
          maindisc,
          searchquery
        );
        this.setState({ brand: brand });
      }
    }

    let p = false;
    if (e.target.value == "false") {
      p = false;
      this.setState({ [e.target.name]: !p });
    } else if (e.target.value == "true") {
      p = true;
      this.setState({ [e.target.name]: !p });
    }

    this.setState({ currentPage: page });
  };

  categoryFilter = (e, categoryin) => {
    e.preventDefault();
    // console.log(e);
    // console.log(e.target);
    let {
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery,
    } = this.state;

    const page = 1;

    if (category.length == 0) {
      category = [];
      category.push(categoryin);
      this.props.getDresses(
        page,
        limit,
        gender,
        brand,
        category,
        color,
        maindisc,
        searchquery
      );
      this.setState({ category: category });
    } else {
      if (category.includes(categoryin)) {
        for (var i = 0; i < category.length; i++) {
          if (category[i] == categoryin) {
            console.log("hi in it");
            category.splice(i, 1);

            console.log(category);
            this.props.getDresses(
              page,
              limit,
              gender,
              brand,
              category,
              color,
              maindisc,
              searchquery
            );
            this.setState({ category: category });
          }
        }
      } else {
        category.push(categoryin);
        this.props.getDresses(
          page,
          limit,
          gender,
          brand,
          category,
          color,
          maindisc,
          searchquery
        );
        this.setState({ category: category });
      }
    }

    let p = false;
    if (e.target.value == "false") {
      p = false;
      this.setState({ [e.target.name]: !p });
    } else if (e.target.value == "true") {
      p = true;
      this.setState({ [e.target.name]: !p });
    }
  };

  colorFilter = (e, colorin) => {
    e.preventDefault();

    let {
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery,
    } = this.state;

    const page = 1;

    if (color.length == 0) {
      color = [];
      color.push(colorin.toLowerCase());
      this.props.getDresses(
        page,
        limit,
        gender,
        brand,
        category,
        color,
        maindisc,
        searchquery
      );
      this.setState({ color: color });
    } else {
      if (color.includes(colorin.toLowerCase())) {
        for (var i = 0; i < color.length; i++) {
          if (color[i] == colorin.toLowerCase()) {
            console.log("hi in it");
            color.splice(i, 1);

            console.log(color);
            this.props.getDresses(
              page,
              limit,
              gender,
              brand,
              category,
              color,
              maindisc,
              searchquery
            );
            this.setState({ color: color });
          }
        }
      } else {
        color.push(colorin.toLowerCase());
        this.props.getDresses(
          page,
          limit,
          gender,
          brand,
          category,
          color,
          maindisc,
          searchquery
        );
        this.setState({ color: color });
      }
    }

    let p = false;
    if (e.target.value == "false") {
      p = false;
      this.setState({ [e.target.name]: !p });
    } else if (e.target.value == "true") {
      p = true;
      this.setState({ [e.target.name]: !p });
    }
  };

  discFilter = (e, discin) => {
    e.preventDefault();

    console.log(e.target.value);
    console.log(e.target.checked);

    let {
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      discount,
      searchquery,
    } = this.state;

    const page = 1;

    maindisc = parseInt(discin.substr(0, 2), 10);

    this.props.getDresses(
      page,
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery
    );
    this.setState({ maindisc: maindisc });

    var keys = Object.keys(discount);

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] !== discin) {
        this.setState({ [keys[i]]: false });
      }
    }

    this.setState({ [e.target.value]: e.target.checked });
  };

  sortFilter = (e, sortin) => {
    if (sortin == "ltoh") {
      this.setState({ htol: false });
    } else if (sortin == "htol") {
      this.setState({ ltoh: false });
    }
    this.setState({ [e.target.name]: e.target.checked });
  };

  changeGender = (gender) => {
    let { limit, brand, category, color, maindisc } = this.state;

    let page = 1;
    let searchquery = "search";

    this.props.getDresses(
      page,
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery
    );

    this.setState({ gender: gender });
    this.setState({ searchquery: "search" });
  };

  searchChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchSubmit = () => {
    let {
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery,
    } = this.state;

    let page = 1;
    console.log(`hi ${searchquery}`);

    this.props.getDresses(
      page,
      limit,
      gender,
      brand,
      category,
      color,
      maindisc,
      searchquery
    );
  };

  displayAll = (e) => {
    if (this.state.branddisplay === "none") {
      this.setState({ branddisplay: "inline-block" });
      this.setState({ brandZindex: "1000" });
    }

    if (this.state.branddisplay === "inline-block") {
      this.setState({ branddisplay: "none" });
      this.setState({ brandZindex: "-1000" });
    }
  };

  displayAllCategories = (e) => {
    if (this.state.categorydisplay === "none") {
      this.setState({ categorydisplay: "inline-block" });
      this.setState({ categoryZindex: "1000" });
    }

    if (this.state.categorydisplay === "inline-block") {
      this.setState({ categorydisplay: "none" });
      this.setState({ categoryZindex: "-1000" });
    }
  };

  addItem = (dress, userid) => {
    this.props.addtoCart(dress, userid);
  };

  addItemWishlist = (dress, userid) => {
    this.props.addtoWishlist(dress, userid);
  };

  render() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
    const { dresses } = this.props.dresses;

    const { colorSet, htol, ltoh, searchquery } = this.state;

    if (dresses.brands) {
      // console.log(dresses.total);
      dresses.categories.sort();
      dresses.brands.sort();
    }

    const source = "http://localhost:5005/";

    let arr = null;

    if (Object.keys(dresses).length !== 0 && ltoh) {
      arr = JSON.parse(JSON.stringify(dresses.dresses));
      // console.log("bye");
      let swapped;
      do {
        swapped = false;
        for (var i = 0; i < arr.length - 1; i++) {
          if (
            parseInt(arr[i].price.replace(",", "")) >
            parseInt(arr[i + 1].price.replace(",", ""))
          ) {
            let tmp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = tmp;
            swapped = true;
          }
        }
      } while (swapped);
    } else if (Object.keys(dresses).length !== 0 && htol) {
      arr = JSON.parse(JSON.stringify(dresses.dresses));
      // console.log("bye");
      let swapped;
      do {
        swapped = false;
        for (var i = 0; i < arr.length - 1; i++) {
          if (
            parseInt(arr[i].price.replace(",", "")) <
            parseInt(arr[i + 1].price.replace(",", ""))
          ) {
            let tmp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = tmp;
            swapped = true;
          }
        }
      } while (swapped);
    } else {
      arr = dresses.dresses;

      // console.log(dresses.dresses);
    }

    return (
      <Fragment>
        <Navbar
          apparelChange={this.changeGender}
          searchfilter={this.searchChange}
          searchword={this.state.searchquery}
          searchsubmit={this.searchSubmit}
        />

        <div className="row " style={{ marginLeft: "2.7rem" }}>
          <button
            data-target="modal1"
            className=" col s3  margin_top_1 btn modal-trigger"
            style={{ marginRight: "1rem" }}
          >
            Price
          </button>
          <button
            data-target="modal2"
            className=" col s3  margin_top_1 btn modal-trigger"
            style={{ marginRight: "1rem" }}
          >
            Brand
          </button>
          <button
            data-target="modal3"
            className=" col s3  margin_top_1 btn modal-trigger"
          >
            Category
          </button>
        </div>

        <div className="SearchResults__page__Result">
          <div className="row">
            {arr
              ? arr.map((dress) => (
                  <div key={dress._id}>
                    {/* <Card
                    dress={dress}
                    cartadd={this.addItem}
                    wishlistadd={this.addItemWishlist}
                    user={this.props.auth}
                  /> */}

                    <div className="col s6 m6">
                      <div className="card">
                        <div className="card-image">
                          <Link to={`/DressMainPage/${dress._id}`}>
                            <img
                              className="responsive-img"
                              style={{ width: "100%", height: "auto" }}
                              src={dress.cover_photo}
                            />
                          </Link>
                          <span className="card-title" />
                        </div>
                        <div className="card-content">
                          <div>
                            <p>
                              <b>{dress.brand.split("/")[0]}</b>
                            </p>
                            <p style={{ height: "9vh" }} className="flow-text">
                              {dress.name}
                            </p>
                            <p>
                              <b>Rs.&nbsp;{dress.price}</b>
                            </p>

                            <div className="row">
                              <button
                                className="btn  btn-small col s10 margin_top_1"
                                onClick={() =>
                                  this.props.auth.user
                                    ? this.addItem(
                                        dress,
                                        this.props.auth.user._id
                                      )
                                    : this.props.createMessage({
                                        LoginRequired: "Login Required",
                                      })
                                }
                              >
                                Add to Cart
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
                                  this.props.auth.user
                                    ? this.addItemWishlist(
                                        dress,
                                        this.props.auth.user._id
                                      )
                                    : this.props.createMessage({
                                        LoginRequired: "Login Required",
                                      })
                                }
                              >
                                WishList
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className="row">
          {dresses ? (
            <Pagination
              postsPerPage={this.state.limit}
              totalPosts={dresses.total}
              activePage={this.state.currentPage}
              paginate={this.paginate}
            />
          ) : null}
        </div>

        <Footer />
        <div id="modal1" className="modal">
          <div className="modal-content row">
            <h4 className="flow-text primary-text">Price</h4>
            <div className="row">
              <input
                className="col s1"
                type="checkbox"
                name="htol"
                value={Boolean(htol)}
                checked={Boolean(htol)}
                onChange={(e) => this.sortFilter(e, "htol")}
                id="high to low"
              />

              <label className="col s9 offset-s1" for="high to low">
                High to Low{" "}
              </label>
            </div>
            <div className="row">
              <input
                className="col s1"
                type="checkbox"
                name="ltoh"
                value={Boolean(ltoh)}
                checked={Boolean(ltoh)}
                onChange={(e) => this.sortFilter(e, "ltoh")}
                id="low to high"
              />
              <label className="col s9 offset-s1" for="low to high">
                Low to High{" "}
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Apply
            </a>
          </div>
        </div>

        <div id="modal2" class="modal">
          <div class="modal-content">
            <h4 className="flow-text primary-text">Brand</h4>
            {/* <p>A bunch of text</p> */}

            {dresses.brands
              ? dresses.brands.sort().map((brand) => (
                  <div key={brand} className="row">
                    <input
                      className="col s1"
                      type="checkbox"
                      name={brand}
                      value={Boolean(this.state[brand])}
                      checked={Boolean(this.state[brand])}
                      onChange={(e) => this.brandFilter(e, brand)}
                      id={brand}
                    />
                    <label className="col s9 offset-s1" for={brand}>
                      {brand}
                    </label>
                  </div>
                ))
              : null}
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">
              Apply
            </a>
          </div>
        </div>

        <div id="modal3" class="modal">
          <div class="modal-content">
            <h4 className="flow-text primary-text">Category</h4>
            {/* <p>A bunch of text</p> */}

            {dresses.categories
              ? dresses.categories.sort().map((category) => (
                  <div key={category} className="row">
                    <input
                      className="col s1"
                      type="checkbox"
                      name={category}
                      value={Boolean(this.state[category])}
                      checked={Boolean(this.state[category])}
                      onChange={(e) => this.categoryFilter(e, category)}
                      id={category}
                    />
                    <label className="col s9 offset-s1" for={category}>
                      {category}
                    </label>
                  </div>
                ))
              : null}
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">
              Apply
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

SofaPage.propTypes = {
  getDresses: PropTypes.func.isRequired,
  dresses: PropTypes.object.isRequired,
  addtoCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dresses: state.dresses,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getDresses,
  addtoCart,
  addtoWishlist,
  createMessage,
})(SofaPage);
