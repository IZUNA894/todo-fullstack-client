import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const apiLink =
  process.env.NODE_ENV == "development" ? "http://127.0.0.1:3001" : "";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    if (this.state.email.length == 0 || this.state.password.length == 0) return;
    const { email, password } = this.state;

    console.log(apiLink, process.env.NODE_ENV);
    var button = document.querySelector("#submitButton");
    button.setAttribute("disabled", "disabled");
    axios
      .post(
        apiLink + "/api/v1/user/login",
        {
          email,
          password,
        },

        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("user", JSON.stringify(res.data.result));
          MySwal.fire({
            icon: "success",
            title: "Logged In",
            text: "You Logged in Successfully",
          });

          window.setTimeout(() => {
            window.location.assign("/home");
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
    return (
      <div className="row">
        <div className="col s12 m12">
          <div style={{ margin: "auto", width: "28%", marginTop: "2rem" }}>
            <div className="card darken-1">
              <div className="card-content ">
                <span className="card-title center">Login </span>
                <hr />
              </div>
              <div className="card-action">
                <div className="row center">
                  <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row  ">
                      <div className="input-field col s10 ">
                        <i className="material-icons prefix">email</i>
                        <input
                          id="icon_prefix"
                          onChange={this.handleChange}
                          type="text"
                          className="validate"
                          name="email"
                        />
                        <label htmlFor="icon_prefix">Email</label>
                      </div>
                      <div className="input-field col s10">
                        <i className="material-icons prefix">keyboard</i>
                        <input
                          onChange={this.handleChange}
                          id="icon_telephone"
                          type="password"
                          className="validate"
                          name="password"
                          minLength={8}
                        />
                        <label htmlFor="icon_telephone">Password</label>
                      </div>
                    </div>
                    <button
                      id="submitButton"
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Login
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
