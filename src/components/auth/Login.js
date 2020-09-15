import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { Alert } from "reactstrap";
import "../../css/style.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

import M from "materialize-css/dist/js/materialize.min.js";

export class Login extends Component {
  state = {
    username: "",

    password: "",
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

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(this.state.username, this.state.password);
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
    if (this.props.isAuthenticated) {
      return <Redirect to="/home/Men" />;
    }

    const { username, password } = this.state;
    return (
      <div>
        <Navbar />
        <header style={{ minHeight: "60vh" }}>
          <div
            className=" login_form row container center-align"
            style={{ margin: "auto" }}
          >
            <form className=" col s12 offset-s1" onSubmit={this.onSubmit}>
              <div className="row">
                <h5 className="col s12 primary-text left-align">Login</h5>
              </div>

              <div className="row">
                <div className="input-field col s8 m4 ">
                  <label htmlFor="user_name-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    onChange={this.onChange}
                    value={username}
                    id="user_name-2"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8 m4 ">
                  <label htmlFor="password-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    id="password-2"
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s4 offset-s2">
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="submit"
                  >
                    Login
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
export default connect(mapStateToProps, { login })(Login);

{
  /* <div className=" login_form row container center-align" style="margin:auto;">
<form className=" col s12 offset-s4" method="POST" name="login_form" enctype="multipart/form-data" action="{% url 'Accounts:user_login' %}">
    {% csrf_token %}
      <div className="row">
              <div className="input-field col s8 m4 ">
                  <label for="id_user_name_or_num">Username or phone number</label>
                {{login_form.user_name_or_num}}
              </div>
      </div>
      <div className="row">
              <div className="input-field col s8 m4 ">
                  <label for="id_password">Password</label>
                {{login_form.password}}
              </div>
      </div>
    <div className="row">
        <div className="input-field col s4">
            <button className="btn waves-effect waves-light" type="submit" name="submit">Login</button>
        </div>
    </div>
</form>
</div> */
}

{
  /* <form onSubmit={this.onSubmit}>
            <div>
              <input
                type="text"
                name="username"
                onChange={this.onChange}
                value={username}
                id="user_name-2"
                placeholder="UserName"
              />
              <label htmlFor="user_name-2">Username</label>
            </div>

            <div>
              <input
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
                id="password-2"
                placeholder="Password"
                style={{ width: "100%" }}
              />
              <label htmlFor="password-2">Password</label>
            </div>
            <div>
              {/* <button type="submit" className="btn">
                Login &rarr;
            </button> */
}
//   <input type="submit" value=" Login &rarr;" />
//   </div>
//   <div>
//     Don't Have an account? <Link to="/register">Register</Link>
//   </div>
// </form> */}
