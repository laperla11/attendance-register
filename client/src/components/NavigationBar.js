import React, { Component } from "react";
import { Link } from "react-router-dom";
import cyf_brand from "../picture/cyf_brand.png";

export class NavigationBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <img className="image" src={cyf_brand} alt="cyf-brand" />
        <ul className="nav justify-content-end">
          <li>
            {" "}
            <Link to="/Navigation">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="#">Sign In</Link>
          </li>
          <li className="nav-item">
            <Link to="#">Sign Up</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationBar;
