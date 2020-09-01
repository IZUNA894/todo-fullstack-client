import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./../components/login.js";
import Signup from "./../components/signup.js";
import Navbar from "./../components/navbar.js";
export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </>
    );
  }
}
