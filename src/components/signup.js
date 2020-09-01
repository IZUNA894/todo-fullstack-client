import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const apiLink =
  process.env.NODE_ENV == "development" ? "http://127.0.0.1:3001" : "";
export default class signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    redirect: null,
  };
  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);

    const { email, password, confirmPassword, username } = this.state;
    if (
      email.length == 0 ||
      password.length == 0 ||
      username.length == 0 ||
      confirmPassword.length == 0
    ) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    if (password.length < 8) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password length should be greater than 8",
      });
      return;
    }
    if (password !== confirmPassword) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and Confirm Password must be equal",
      });
      return;
    }

    var button = document.querySelector("#submitButton");
    button.setAttribute("disabled", "disabled");
    axios
      .post(
        apiLink + "/api/v1/user/signup",
        {
          email,
          password,
          confirmPassword,
          username,
        },

        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem(
            "user",
            JSON.stringify(res.data.result.ops[0])
          );
          MySwal.fire({
            icon: "success",
            title: "Signed Up",
            text: "You Signed Up Successfully",
          });
          window.setTimeout(() => {
            this.setState({ redirect: "/home" });
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err.message);
        MySwal.fire({
          icon: "error",
          title: "error",
          text: "couldn't not login",
        });
        button.removeAttribute("disabled");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="row">
        <div className="col s12 m12">
          <div style={{ margin: "auto", width: "28%", marginTop: "2rem" }}>
            <div className="card darken-1">
              <div className="card-content ">
                <span className="card-title center">Sign Up </span>
                <hr />
              </div>
              <div className="card-action">
                <div className="row center">
                  <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row  ">
                      <div className="input-field col s10 ">
                        <i className="material-icons prefix">account_circle</i>
                        <input
                          name="username"
                          onChange={this.handleChange}
                          id="username"
                          type="text"
                          className="validate"
                        />
                        <label htmlFor="username">Username</label>
                      </div>
                      <div className="input-field col s10 ">
                        <i className="material-icons prefix">email</i>
                        <input
                          name="email"
                          onChange={this.handleChange}
                          id="email"
                          type="email"
                          className="validate"
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                      <div className="input-field col s10">
                        <i className="material-icons prefix">keyboard</i>
                        <input
                          name="password"
                          onChange={this.handleChange}
                          id="password"
                          type="password"
                          className="validate"
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                      <div className="input-field col s10">
                        <i className="material-icons prefix">keyboard</i>
                        <input
                          name="confirmPassword"
                          onChange={this.handleChange}
                          id="confirmPassword"
                          type="password"
                          className="validate"
                        />
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                      id="submitButton"
                    >
                      Sign Up
                      <i className="material-icons right">send</i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
