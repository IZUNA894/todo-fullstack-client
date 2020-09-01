import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Starter from "./pages/starter.js";
import Home from "./pages/home.js";
import "./App.css";
export default class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Starter />
          </Route>
        </Switch>
      </>
    );
  }
}
