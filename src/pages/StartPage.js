import React, { Fragment } from "react";

import "./../App.css";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import { Link } from "react-router-dom";
import $ from "jquery";

import M from "materialize-css/dist/js/materialize.min.js";

class StartPage extends React.Component {
  componentDidMount() {
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

    var elems = document.querySelectorAll(".carousel");
    var instances = M.Carousel.init(elems, {});

    // style="transform: translateX(0%)"
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="row" style={{ minHeight: "33vh" }}>
          <Link to="/">
            <img
              className="responsive-img col s10 offset-s1"
              src={require("./../components/img/banner.jpg")}
            />
          </Link>
        </div>
        <div className="row">
          <h5 className="col s9 offset-s2 primary-text">
            Shop from our categories
          </h5>
        </div>
        <div className="row">
          <div className="carousel" style={{ height: "25vh" }}>
            <Link className="carousel-item" to="/home/Men">
              <h5
                className="flow-text black-text"
                style={{ transform: "translateX(1rem)" }}
              >
                Chairs
              </h5>
              <img src="https://shop.static.ingka.ikea.com/revamp/chairs_fu002-in.jpg" />
            </Link>
            <Link className="carousel-item" to="/home/Women">
              <h5
                className="flow-text  black-text"
                style={{ transform: "translateX(1rem)" }}
              >
                Tables & desks
              </h5>
              <img src="https://shop.static.ingka.ikea.com/category-images/Category_tables-and-desks.jpg" />
            </Link>
            <Link className="carousel-item" to="/home/Kids">
              <h5
                className="flow-text black-text"
                style={{ transform: "translateX(1rem)" }}
              >
                Beds
              </h5>
              <img src="https://shop.static.ingka.ikea.com/revamp/beds_bm003.jpg" />
            </Link>
            <Link className="carousel-item" to="/home/Children">
              <h5
                className="flow-text black-text"
                style={{ transform: "translateX(1rem)" }}
              >
                Children's furniture
              </h5>
              <img src="https://shop.static.ingka.ikea.com/category-images/Category_small-furniture.jpg" />
            </Link>
            <Link className="carousel-item" to="/home/Sofas">
              <h5
                className="flow-text black-text"
                style={{ transform: "translateX(1rem)" }}
              >
                Sofas & armchairs
              </h5>
              <img src="https://shop.static.ingka.ikea.com/category-images/Category_sofas-and-armchairs.jpg" />
            </Link>
            <Link className="carousel-item" to="/home/Bookcases">
              <h5
                className="flow-text black-text"
                style={{ transform: "translateX(1rem)" }}
              >
                Bookcases & shelving units
              </h5>
              <img src="https://shop.static.ingka.ikea.com/revamp/bookcases-shelving-units_st002.jpg" />
            </Link>
            <Link className="carousel-item black-text" to="/home/Chests">
              <h5
                className="flow-text"
                style={{ transform: "translateX(1rem)" }}
              >
                Chest of drawers & drawer units
              </h5>
              <img src="https://shop.static.ingka.ikea.com/category-images/Category_chest-of-drawers-and-drawer-units.jpg" />
            </Link>

            <Link className="carousel-item" to="/home/Tv">
              <h5
                className="flow-text black-text"
                style={{ transform: "translateX(1rem)" }}
              >
                TV & media furniture
              </h5>
              <img src="https://shop.static.ingka.ikea.com/category-images/Category_tv-and-media-storage.jpg" />
            </Link>
            <Link className="carousel-item" to="/home/Wardrobe">
              <h5
                className="flow-text black-text"
                style={{ transform: "translateX(1rem)" }}
              >
                Wardrobes
              </h5>
              <img src="https://shop.static.ingka.ikea.com/revamp/wardrobes_19053.jpg" />
            </Link>
            <Link className="carousel-item" to="/home/Bar">
              <h5
                className="flow-text black-text"
                style={{ transform: "translateX(1rem)" }}
              >
                Bar Furniture
              </h5>
              <img src="https://shop.static.ingka.ikea.com/category-images/Category_bar-tables-and-chairs.jpg" />
            </Link>
          </div>
        </div>

        <Footer />
      </Fragment>
    );
  }
}

{
  /* <div className="Homepage__page">
          <div className="Homepage__page__banner">
            <Link to="/">
              <img src={require("./../components/img/banner.jpg")} />
            </Link>
          </div>
          
             
              <div className="Homepage__page__links__right__item Homepage__page__links__item">
                <Link to="/home/Tv">
                  <img
                    className="Homepage__page__links__right__item__image"
                    src="https://shop.static.ingka.ikea.com/category-images/Category_tv-and-media-storage.jpg"
                  />
                </Link>
                <h1 className="Homepage__page__links__right__item__text">
                  TV & media furniture
                </h1>
              </div>
              <div className="Homepage__page__links__right__item Homepage__page__links__item">
                <Link to="/home/Wardrobe">
                  <img
                    className="Homepage__page__links__right__item__image"
                    src="https://shop.static.ingka.ikea.com/revamp/wardrobes_19053.jpg"
                  />
                </Link>
                <h1 className="Homepage__page__links__right__item__text">
                  Wardrobes
                </h1>
              </div>
              <div className="Homepage__page__links__right__item Homepage__page__links__item">
                <Link to="/home/Bar">
                  <img
                    className="Homepage__page__links__right__item__image"
                    src="https://shop.static.ingka.ikea.com/category-images/Category_bar-tables-and-chairs.jpg"
                  />
                </Link>
                <h1 className="Homepage__page__links__right__item__text">
                  Bar Furniture
                </h1>
              </div>
            </div>
          </div>
        </div>
        <Footer /> */
}

export default StartPage;
