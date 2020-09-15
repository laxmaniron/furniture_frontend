import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import HomePage from "./components/HomePage";
import WomenHomePage from "./components/WomenHomePage";
import KidsHomePage from "./components/KidsHomePage";
import DressModal from "./components/DressModal";
import SearchResults from "./pages/SearchResults";
import Register from "./components/auth/Register";
import { Container } from "reactstrap";
import "./App.css";

import { Provider as AlertProvider } from "react-alert";
import { Provider } from "react-redux";
import AlertTemplate from "react-alert-template-basic";

import store from "./store";
import { loadUser } from "./actions/authActions";
import Login from "./components/auth/Login";
import ShowProfile from "./components/auth/ShowProfile";
import DressMainPage from "./components/dresspages/DressMainPage";
import CartPage from "./components/dresspages/CartPage";
import WishlistPage from "./components/dresspages/WishlistPage";
import Alerts from "./components/Alerts";
import Navbar from "./components/Navbar";
import Zoomer from "./components/Zoomer";
import paySmartComponent from "./components/payments/paySmartComponent";
import StartPage from "./pages/StartPage";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Orders from "./components/payments/Orders";
import ChildrenPage from "./components/ChildrenPage";
import SofaPage from "./components/SofaPage";
import BookPage from "./components/BookPage";
import ChestPage from "./components/ChestPage";
import TvPage from "./components/TvPage";
import WardrobePage from "./components/WardrobePage";
import BarPage from "./components/BarPage";

//Alert Options

const alertOptions = {
  timeout: 5000,
  position: "bottom center",
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <div className="App">
              <Alerts />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/home/Men" component={HomePage} />
                <Route exact path="/home/Women" component={WomenHomePage} />
                <Route exact path="/home/Kids" component={KidsHomePage} />
                <Route exact path="/home/Children" component={ChildrenPage} />
                <Route exact path="/home/Sofas" component={SofaPage} />
                <Route exact path="/home/Bookcases" component={BookPage} />
                <Route exact path="/home/Chests" component={ChestPage} />
                <Route exact path="/home/Tv" component={TvPage} />
                <Route exact path="/home/Wardrobe" component={WardrobePage} />
                <Route exact path="/home/Bar" component={BarPage} />

                <Route
                  path="/externalar"
                  component={() => {
                    window.location.href = "http://my_host/deeptest";
                    return null;
                  }}
                />

                <Route exact path="/register" component={Register} />
                <Route exact path="/ShowProfile/" component={ShowProfile} />
                <Route
                  exact
                  path="/DressMainPage/:id"
                  component={DressMainPage}
                />
                <Route exact path="/MainPage" component={SearchResults} />
                <Route exact path="/cart" component={CartPage} />
                <Route exact path="/wishlist" component={WishlistPage} />
                <Route exact path="/zoomer" component={Zoomer} />
                <Route exact path="/pay" component={paySmartComponent} />
                <Route exact path="/start" component={StartPage} />
                <Route exact path="/orders" component={Orders} />
              </Switch>
            </div>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
