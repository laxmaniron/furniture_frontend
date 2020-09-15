import React from "react";
import "./../App.css";
import { Link } from "react-router-dom";
import $ from "jquery";

class WishListCard extends React.Component {
  render() {
    const { dress, user, deleteitem, wishlist, moveitem } = this.props;
    return (
      <div className="Card">
        <div className="Card__image">
          <Link to={`/DressMainPage/${dress._id}`}>
            <img src={dress.cover_photo} />
          </Link>
        </div>
        <div className="Card__matter">
          <div className="Card__title">
            <h2>{dress.brand.split("/")[0]}</h2>
          </div>
          <div className="Card__description">
            <p>{dress.name}</p>
          </div>
          <div className="Card__buttons">
            <div
              className="btn btn--pink"
              onClick={() => moveitem(wishlist.wishlistid)}
            >
              Move to Cart
            </div>
            <div
              className="btn btn--grey"
              onClick={() => deleteitem(wishlist.wishlistid)}
            >
              Remove
            </div>
          </div>
          <div className="Card__sizes">
            Sizes:&nbsp;S,&nbsp;M,&nbsp;L,&nbsp;XL
          </div>
          <div className="Card__price">
            <b>Rs.&nbsp;{dress.price}</b>
          </div>
        </div>
      </div>
    );
  }
}

export default WishListCard;
