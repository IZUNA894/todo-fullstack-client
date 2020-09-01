import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="#!" className="brand-logo center">
              To Do WebAPP
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="collapsible.html">Help</Link>
              </li>
              <li>
                <Link to="signup">Sign Up</Link>
              </li>
              <li>
                <Link to="">Log In</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
