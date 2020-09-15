import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile, UpdateUserProfile } from "../../actions/authActions";
import { Alert } from "reactstrap";
import { Redirect } from "react-router-dom";
import ReactTimeout from "react-timeout";
import Navbar from "../Navbar";
import AppNavbar from "../AppNavbar";
import "./Showprofile.css";
import Footer from "../Footer";

// import "../../css/style.css";

import M from "materialize-css/dist/js/materialize.min.js";

export class ShowProfile extends Component {
  state = {
    showProfileChangeInfo: true,
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    Address: "",
    pincode: "",
    profilepic: "",
    profilepicparse: "",
    msg: null,
    reload: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "UPDATE_FAIL") {
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

  onShowClick = (e) => {
    if (this.state.showProfileChangeInfo === true) {
      this.setState({
        email: this.props.userprofile.email,
        firstname: this.props.userprofile.firstname,
        lastname: this.props.userprofile.lastname,
        phoneno: this.props.userprofile.phoneno,
        Address: this.props.userprofile.Address,
        pincode: this.props.userprofile.pincode,
      });
    }
    this.setState({
      showProfileChangeInfo: !this.state.showProfileChangeInfo,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      firstname,
      lastname,
      phoneno,
      Address,
      pincode,
      profilepic,
      profilepicparse,
    } = this.state;

    if (email === "") {
      this.setState({ msg: "email should  not be empty" });
      return;
    } else if (firstname === "") {
      this.setState({ msg: "firstname should not be empty" });
      return;
    } else if (lastname === "") {
      this.setState({ msg: "lastname should not be empty" });
      return;
    } else if (phoneno === "") {
      this.setState({ msg: "phoneno should not be empty" });
      return;
    } else if (Address === "") {
      this.setState({ msg: "Address should not be empty" });
      return;
    } else if (pincode === "") {
      this.setState({ msg: "pincode should not be empty" });
      return;
    } else {
      const updatedUser = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        phoneno: phoneno,
        Address: Address,
        pincode: pincode,
        profilepic: profilepic,
        profilepicparse: profilepicparse,
      };

      console.log(updatedUser);

      this.props.UpdateUserProfile(updatedUser);

      this.setState({
        showProfileChangeInfo: !this.state.showProfileChangeInfo,
      });
    }
  };

  static propTypes = {
    getProfile: PropTypes.func.isRequired,
    userprofile: PropTypes.object.isRequired,
    UpdateUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  setData = () => {
    this.setState({ reload: true });
  };

  componentDidMount() {
    this.props.getProfile();
    this.props.setTimeout(this.setData, 150);

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

  render() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
    const { isAuthenticated } = this.props.auth;

    if (!isAuthenticated && this.state.reload) {
      return <Redirect to="/home/Men" />;
    }

    const source = "http://localhost:5005/";

    const { showProfileChangeInfo } = this.state;

    const {
      email,
      firstname,
      lastname,
      phoneno,
      Address,
      pincode,
      profilepicparse,
    } = this.state;

    var img = "";
    if (this.props.userprofile) {
      img = this.props.userprofile.profilepic.replace("uploads/", "");
      console.log(typeof this.props.userprofile.profilepic);
    }
    return (
      <div>
        <Navbar />
        <div className="row">
          <h4 className="col s9 offset-s4 primary-text">Profile</h4>
        </div>

        {this.props.userprofile ? (
          <div
            class="col s8  m8 offset-m2 l6 offset-l3 valign-wrapper"
            style={{ minHeight: "65vh" }}
          >
            <div class="card">
              <div>
                <img
                  src="https://i.ibb.co/jyX1M0S/kiernan-shipka-bio-net-worth-facts.jpg"
                  className="circle responsive-img"
                  style={{ width: "60%", marginLeft: "4.5rem" }}
                />
                <span className="card-title"></span>
              </div>
              <div class="card-content">
                <div className="card-title center-align">
                  {this.props.userprofile.username}
                </div>
                <div className="card-title left-align">
                  <span className="flow-text">
                    FirstName: &emsp;&emsp; {this.props.userprofile.firstname}
                  </span>
                </div>
                <div className="card-title left-align">
                  <span className="flow-text">
                    LastName: &emsp;&emsp; {this.props.userprofile.lastname}
                  </span>
                </div>
                <div className="card-title left-align">
                  <span className="flow-text">
                    Phone: &emsp;&emsp; {this.props.userprofile.phoneno}
                  </span>
                </div>
                <div className="card-title left-align ">
                  <span className="flow-text">
                    Email: &emsp;&emsp; {this.props.userprofile.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userprofile: state.auth.user,
  auth: state.auth,
  error: state.error,
});

export default ReactTimeout(
  connect(mapStateToProps, { getProfile, UpdateUserProfile })(ShowProfile)
);

{
  /* <div style={{ marginTop: "7rem" }}>
          <h2
            style={{
              textAlign: "center",
            }}
            className="your-profile "
            style={{ color: "var(--color-primary)" }}
          >
            Your Profile &nbsp;&nbsp;
            <i
              // style={{ cursor: "pointer" }}
              // onClick={this.onShowClick}
              className="fas fa-user-edit"
            />
          </h2>

          <div>
            {this.props.userprofile ? (
              <header className="header2">
                <div className="propic-div">
                  <h2>
                    <img
                      style={{ marginTop: "-15rem" }}
                      className="profilePicClass profilepic-showpro"
                      src={source + img}
                      alt="Avatar"
                    />
                  </h2>
                </div>

                <div
                  className="details showpro-details"
                  style={{ marginTop: "-15rem" }}
                >
                  <div>
                    <h3>UserName &nbsp;:</h3>
                    <span>&nbsp; &nbsp;{this.props.userprofile.username}</span>
                  </div>
                  <div>
                    <h3>FirstName &nbsp;:</h3>
                    <span>&nbsp; &nbsp;{this.props.userprofile.firstname}</span>
                  </div>
                  <div>
                    <h3>LastName &nbsp;:</h3>
                    <span>&nbsp; &nbsp;{this.props.userprofile.lastname}</span>
                  </div>
                  <div>
                    <h3>PhoneNumber &nbsp;:</h3>
                    <span>&nbsp; &nbsp;{this.props.userprofile.phoneno}</span>
                  </div>

                  <div>
                    <h3>Email &nbsp;:</h3>
                    <span>&nbsp; &nbsp;{this.props.userprofile.email}</span>
                  </div>
                </div>
              </header>
            ) : null}
          </div>
        </div> */
}
