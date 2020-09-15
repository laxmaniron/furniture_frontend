import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { Alert } from "reactstrap";
import { clearErrors } from "../../actions/errorActions";

import Navbar from "../Navbar";
import Footer from "../Footer";

import M from "materialize-css/dist/js/materialize.min.js";

export class Register extends Component {
  state = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    phoneno: "",
    Address: "",
    pincode: "",
    gender: "",
    role: "",
    profilepic: "uploaded",
    profilepicparse: "",
    msg: null,
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

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

    // style="transform: translateX(0%)"
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({ profilepicparse: event.target.files[0] });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      username,
      email,
      firstname,
      lastname,
      password,
      password2,
      phoneno,
      Address,
      pincode,
      gender,
      role,
      profilepic,
      profilepicparse,
    } = this.state;

    if (password !== password2) {
      this.setState({ msg: "Passwords did not match" });
      return;
    } else {
      const newUser = {
        username,
        email,
        firstname,
        lastname,
        password,
        phoneno,
        Address,
        pincode,
        gender,
        role,
        profilepic,
        profilepicparse,
      };

      this.props.register(newUser);
    }
  };

  render() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
    if (this.props.isAuthenticated) {
      this.props.clearErrors();
      return <Redirect to="/start" />;
    }

    const {
      username,
      email,
      firstname,
      lastname,
      password,
      password2,
      phoneno,
      Address,
      pincode,
      gender,
      role,
      profilepicparse,
    } = this.state;

    return (
      <div>
        <Navbar />
        <header style={{ minHeight: "60vh" }}>
          <div
            class=" login_form row container center-align"
            style={{ margin: "auto" }}
          >
            <form
              onSubmit={this.onSubmit}
              class=" col s12 offset-s1"
              encType="multipart/form-data"
            >
              <div className="row">
                <h5 className="col s12 primary-text left-align">Signup</h5>
              </div>
              <div className="row">
                <div class="input-field col s8 m4 ">
                  <input
                    type="text"
                    name="username"
                    onChange={this.onChange}
                    value={username}
                    id="user_name-1"
                  />
                  <label htmlFor="user_name-1">Username</label>
                </div>
              </div>
              <div className="row">
                <div class="input-field col s8 m4 ">
                  <input
                    type="email"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    id="email"
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>

              <div className="row">
                <div class="input-field col s8 m4 ">
                  <input
                    type="text"
                    name="firstname"
                    onChange={this.onChange}
                    value={firstname}
                    id="first_name"
                  />
                  <label htmlFor="first_name">First name</label>
                </div>
              </div>

              <div className="row">
                <div class="input-field col s8 m4 ">
                  <input
                    type="text"
                    name="lastname"
                    onChange={this.onChange}
                    value={lastname}
                    id="last_name"
                  />
                  <label htmlFor="last_name">Last name</label>
                </div>
              </div>

              <div className="row">
                <div class="input-field col s8 m4 ">
                  <input
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    id="password-1"
                  />
                  <label htmlFor="password-1">Password</label>
                </div>
              </div>

              <div className="row">
                <div class="input-field col s8 m4 ">
                  <input
                    type="password"
                    name="password2"
                    onChange={this.onChange}
                    value={password2}
                    id="re_password"
                  />
                  <label htmlFor="re_password">Confirm Password</label>
                </div>
              </div>

              <div className="row">
                <div class="input-field col s8 m4 ">
                  <input
                    type="text"
                    name="phoneno"
                    onChange={this.onChange}
                    value={phoneno}
                    id="phone_no"
                  />
                  <label htmlFor="phone_no">Phone Number</label>
                </div>
              </div>

              <div className="row">
                <div class="input-field col s8 m4 ">
                  <input
                    type="text"
                    name="Address"
                    onChange={this.onChange}
                    value={Address}
                    id="address"
                  />
                  <label htmlFor="address">Address</label>
                </div>
              </div>

              <div className="row">
                <div class="input-field col s8 m4 ">
                  <input
                    type="text"
                    name="pincode"
                    onChange={this.onChange}
                    value={pincode}
                    id="pin_code"
                  />
                  <label htmlFor="pin_code">PinCode</label>
                </div>
              </div>

              <div className="row">
                <div class="input-field col s8 m4 ">
                  <label htmlFor="small-male">
                    <input
                      class="with-gap"
                      style={{ display: "none" }}
                      type="radio"
                      id="small-male"
                      onChange={this.onChange}
                      name="gender"
                      value="male"
                    />
                    <span> Male</span>
                  </label>
                </div>
                <div class="input-field col s8 m4 ">
                  <label htmlFor="small">
                    <input
                      class="with-gap"
                      style={{ display: "none" }}
                      type="radio"
                      id="small"
                      onChange={this.onChange}
                      name="gender"
                      value="female"
                    />

                    <span> Female</span>
                  </label>
                </div>
              </div>

              <div className="row">
                <div class="input-field col s8 m4 ">
                  <label htmlFor="small-customer">
                    <input
                      class="with-gap"
                      style={{ display: "none" }}
                      type="radio"
                      id="small-customer"
                      onChange={this.onChange}
                      name="role"
                      value="customer"
                    />

                    <span> Customer</span>
                  </label>
                </div>

                <div class="input-field col s8 m4 ">
                  <label htmlFor="small-designer">
                    <input
                      class="with-gap"
                      style={{ display: "none" }}
                      type="radio"
                      id="small-designer"
                      onChange={this.onChange}
                      name="role"
                      value="designer"
                    />
                    <span> Designer</span>
                  </label>
                </div>
              </div>

              <div className="row" style={{ marginBottom: "5rem" }}>
                <div class="input-field col s8 m4 ">
                  <label for="id_resume">
                    <span>Profile Picture</span>
                    <input
                      type="file"
                      name="profilepicparse"
                      onChange={this.fileSelectedHandler}
                      // value={profilepicparse.name}
                      id="id_resume"
                    />
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s4 offset-s2">
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="submit"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </header>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);

{
  /* <div class="input-field col s8 m4 ">
<label for="id_resume"><span>Resume (optional)</span>{{basic_form.resume}}</label>

</div> */
}
