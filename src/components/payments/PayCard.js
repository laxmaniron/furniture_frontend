import React from "react";
import "./../../App.css";
import { Link } from "react-router-dom";
import $ from "jquery";

class PayCard extends React.Component {
  render() {
    const { dress, user, cart, deleteitem } = this.props;
    return <img className="responsive-img" src={dress.cover_photo} />;
  }
}

export default PayCard;
