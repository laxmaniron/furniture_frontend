import React, { Component, Fragment } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getDressMaininfo } from "../../actions/dressMainActions";
import { addtoCart } from "../../actions/cartActions";
import { addtoWishlist } from "../../actions/wishlistAcions";
import { createMessage } from "../../actions/messages";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTimeout from "react-timeout";
import "../../css/image_align.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Magnifier from "react-magnifier";

import ImageGallery from "react-image-gallery";

import { Link } from "react-router-dom";

import "react-image-gallery/styles/css/image-gallery.css";

import M from "materialize-css/dist/js/materialize.min.js";

class DressMainPage extends Component {
  setData = () => {
    this.setState({ alldata: this.props.maindress });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getDressMaininfo(id);
    this.props.setTimeout(this.setData, 250);

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

  state = {
    alldata: {
      dress: {},
      dresscurrentcolor: {},
      dressallcolor: [],
      colormodel: [],
    },
    hdimageno: 0,

    value: 0,
  };

  onChange = (value) => this.setState({ value });

  static propTypes = {
    getDressMaininfo: PropTypes.func.isRequired,
    maindress: PropTypes.object.isRequired,
  };

  colorChange = (id) => {
    let { alldata } = this.state;
    let len = alldata.dressallcolor ? alldata.dressallcolor.length : 0;
    for (var i = 0; i < len; i++) {
      console.log(`${alldata.dressallcolor[i].colorId}  hi hi  ${id}`);
      if (alldata.dressallcolor[i].colorId === id) {
        alldata.dresscurrentcolor = alldata.dressallcolor[i];
        break;
      }
    }

    this.setState({ alldata: alldata });
  };

  hdImageChange = (id) => {
    this.setState({ hdimageno: id });
  };

  addcart = () => {
    if (this.props.auth.user) {
      this.props.addtoCart(
        this.props.maindress.dress,
        this.props.auth.user._id
      );
    } else {
      this.props.createMessage({
        LoginRequired: "Login Required",
      });
    }
  };

  addwishlist = () => {
    if (this.props.auth.user) {
      this.props.addtoWishlist(
        this.props.maindress.dress,
        this.props.auth.user._id
      );
    } else {
      this.props.createMessage({
        LoginRequired: "Login Required",
      });
    }
  };

  // {alldata.dresscurrentcolor.smallimageset
  //   ? alldata.dresscurrentcolor.smallimageset.map((image) => (
  //       <Fragment key={image}>
  //         <img
  //           src={image}
  //           className="SearchItem__page__images__small__item"
  //           onClick={this.hdImageChange.bind(
  //             this,
  //             alldata.dresscurrentcolor.smallimageset.indexOf(image)
  //           )}
  //         />
  //       </Fragment>
  //     ))
  //   : null}

  render() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
    let { alldata, hdimageno } = this.state;
    console.log(this.props.maindress);

    let colorcount = alldata.colormodel.length;

    let displaycount = 0;

    if (colorcount >= 2) {
      displaycount = 1;
    }

    let images_caro = [];

    if (alldata.dresscurrentcolor.smallimageset) {
      for (
        var im = 0;
        im < alldata.dresscurrentcolor.smallimageset.length;
        im++
      ) {
        images_caro.push({
          original: alldata.dresscurrentcolor.hdimageset[im],
          thumbnail: alldata.dresscurrentcolor.smallimageset[im],
        });
      }
    }

    return (
      <div>
        <Navbar />

        {alldata.dresscurrentcolor.smallimageset ? (
          <ImageGallery
            showNav={false}
            showFullscreenButton={false}
            showPlayButton={false}
            fullscreen
            items={images_caro}
          />
        ) : null}

        <div className="row">
          <div class="col s12 m6">
            <div class="card white">
              <div class="card-content black-text ">
                <span class="card-title">Item Details</span>
                <p>
                  <div style={{ fontSize: "1.2rem" }}>
                    Brand &emsp; {alldata.dress.brand}
                  </div>
                  <div style={{ fontSize: "1.2rem" }}>
                    Name &emsp; {alldata.dress.name}
                  </div>

                  <div style={{ fontSize: "1.2rem" }}>
                    Price &emsp; &#8377;
                    {alldata.dresscurrentcolor.price}
                  </div>
                  <div className="row" style={{ marginTop: "0.5rem" }}>
                    <Link to="/externalar">
                      <img
                        className="responsive-img col s2"
                        src={require("../img/arlogo.png")}
                        alt="smw logo"
                      />
                    </Link>
                    <span
                      style={{
                        transform: "translateY(50%)",
                        fontSize: "1.2rem",
                      }}
                      className="col s10"
                    >
                      Tryout our AR feature
                    </span>
                  </div>
                </p>
              </div>
              <div className="row">
                <button
                  className="btn  btn-small col s4 margin_top_1"
                  onClick={this.addcart}
                  style={{
                    marginRight: "1rem",
                    marginLeft: "2rem",
                    marginBottom: "1rem",
                  }}
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
                  className="btn btn-small col s4 margin_top_1 btnchange"
                  onClick={this.addwishlist}
                >
                  WishList
                </button>
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
  maindress: state.dressMainpageReducer,
  auth: state.auth,
});

export default ReactTimeout(
  connect(mapStateToProps, {
    getDressMaininfo,
    addtoCart,
    addtoWishlist,
    createMessage,
  })(DressMainPage)
);

// {/* <div className="SearchItem__page">
// <div className="SearchItem__page__images">

// <div className="SearchItem__page__images__big">
//   {alldata.dresscurrentcolor.hdimageset ? (
//     <Fragment>
//       {/* className="SearchItem__page__images__big__item" */}
//       <Magnifier
//         src={alldata.dresscurrentcolor.hdimageset[hdimageno]}
//         width={500}
//         mgShape="square"
//         zoomFactor="1.3"
//         mgWidth={200}
//         mgHeight={200}
//       />
//     </Fragment>
//   ) : null}
// </div>

// {alldata.dress ? (
//   <div className="SearchItem__page__description">
//     <div className="SearchItem__page__description__title">
//       {alldata.dress.brand}
//     </div>
//     <div className="SearchItem__page__description__description">
//       {alldata.dress.name}
//     </div>
//     <div className="SearchItem__page__description__price">
//       <b>
//         Rs.&nbsp;
//         {alldata.dresscurrentcolor.price ? (
//           <span>{alldata.dresscurrentcolor.price}</span>
//         ) : null}
//       </b>
//       &nbsp; <sub>inclusive of all taxes</sub>
//     </div>
//     {displaycount ? (
//       <div className="SearchItem__page__description__colours">
//         <h1>Available colors </h1>

//         {alldata.colormodel.length
//           ? alldata.colormodel.map((color) =>
//               color.color_dresspic ? (
//                 <span
//                   key={color._id}
//                   onClick={this.colorChange.bind(this, color._id)}
//                 >
//                   <img
//                     className="SearchItem__page__images__small__item"
//                     src={color.color_dresspic}
//                   />
//                 </span>
//               ) : null
//             )
//           : null}
//       </div>
//     ) : null}
//     <div className="SearchItem__page__description__size">
//       <div>
//         <h1 className="SearchItem__page__description__size__title">
//           Select your size
//         </h1>
//       </div>
//     </div>
//     <div className="SearchItem__page__description__buttons">
//       <div
//         onClick={this.addcart}
//         className="btn btn--pink btn--large"
//       >
//         Add to Cart{" "}
//       </div>
//       <button
//         onClick={this.addwishlist}
//         className="btn btn--grey btn--large"
//       >
//         WishList{" "}
//       </button>
//     </div>
//   </div>
// ) : null}
// </div> */}
