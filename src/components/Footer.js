import React from "react";
import "./../App.css";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      //   <div className="fparent">
      //     <footer className="footer">
      //       <div className="footer__section">
      //         <h1 className="footer__heading"> About Us</h1>
      //         <div>
      //           <img className="user-nav__icon footer__icon" alt="address" src={require("./img/SVG/location.svg")} />
      //           <p><b>Address:</b>&nbsp;IIIT Sri City, Chittoor,India</p>
      //         </div>
      //         <div>
      //             <img className="user-nav__icon footer__icon" alt="address" src={require("./img/SVG/mail4.svg")} />
      //             <p><b>Mail:</b>&nbsp;stylemyway456@gmail.com</p>
      //         </div>
      //         <div>
      //           <img className="user-nav__icon footer__icon" alt="address" src={require("./img/SVG/phone.svg")} />
      //           <p><b>Phone</b>&nbsp;+91 &nbsp;7989294108</p>
      //         </div>
      //       </div>

      //       <div className="footer__section">
      //       <h1 className="footer__heading"> Connect with Us </h1>
      //           <div className="footer__icons">
      //         <img className="user-nav__icon footer__icon" alt="address" src={require("./img/SVG/facebook2.svg")} />

      //         <img className="user-nav__icon footer__icon" alt="address" src={require("./img/SVG/pinterest.svg")} />

      //         <img className="user-nav__icon footer__icon" alt="address" src={require("./img/SVG/twitter.svg")} />
      //           </div>

      //       </div>

      //       <div className="footer__section">
      //       <h1 className="footer__heading"> Available on</h1>
      //         <div className="footer__icons">
      //         <img className="user-nav__icon footer__icon" alt="address" src={require("./img/SVG/android.svg")} />

      //         <img className="user-nav__icon footer__icon" alt="address" src={require("./img/SVG/appleinc.svg")} />
      //         </div>
      //       </div>
      //     </footer>
      //     <div className="copyright">  &copy; 2019 by Mukhesh. All rights reserved.</div>
      // </div>
      <div className="footer">
        <footer className="page-footer grey darken-3">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">About Us</h5>
                <p className="grey-text text-lighten-4">
                  Style Your House is a furniture shopping app which is easy to
                  use and has modern AR feature to experiment with the furniture
                </p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2020 Copyright Text
              <a className="grey-text text-lighten-4 right" href="#!"></a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;
