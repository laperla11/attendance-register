import React, { Component } from "react";
import { Link } from "react-router-dom";
import cyf_brand from "../picture/cyf_brand.png";

export class NavigationBar extends Component {
  render() {
    return (
      <div className="logo-nav">
        <input type="checkbox" id="nav-check" />
        <div className="logo-nav-header">
          <div className="logo-nav-title">
            <img className="image" src={cyf_brand} alt="cyf-brand" />
          </div>
        </div>
        <div className="logo-nav-btn">
          <label for="nav-check">
            <span />
            <span />
            <span />
          </label>
        </div>

        <div className="logo-nav-links">
          <Link to="#">Sign In </Link>|
         
          <Link to="#">Sign Up</Link>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
