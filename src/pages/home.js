import React, { Component } from "react";
import axios from "axios";
import Home from "./../components/home";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const apiLink =
  process.env.NODE_ENV == "development" ? "http://127.0.0.1:3001" : "";

export default class home extends Component {
  state = {
    redirect: null,
  };
  logout = () => {
    const res = axios
      .get(apiLink + "/api/v1/user/logout")
      .then((res) => {
        console.log("clearing out");
        if ((res.data.status = "success")) {
          window.localStorage.setItem("user", "");
          window.localStorage.setItem("token", "");

          this.setState({ redirect: "/" });
        }
      })
      .catch((err) => {
        console.log(err.response);
        // showAlert("error", "Error logging out! Try again.");
      });
  };
  componentWillMount() {
    let token = window.localStorage.getItem("token");
    if (!token || token.length == 0) {
      MySwal.fire({
        icon: "error",
        title: "error",
        text: "either you are not authorized or page not exist",
      });
      window.location.assign("/");
      return;
    }
  }

  render() {
    let user = window.localStorage.getItem("user");

    user = JSON.parse(user);
    console.log(user);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <>
        <nav>
          <div className="nav-wrapper">
            <Link to="" className="brand-logo center">
              To Do WebAPP
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="">
                  <span className="right">{user.username}</span>

                  <span className="right">
                    <i className="small material-icons">account_circle</i>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <span className="right" onClick={this.logout}>
                    Log Out
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Home />
      </>
    );
  }
}
