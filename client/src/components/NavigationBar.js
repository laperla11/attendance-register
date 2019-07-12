import React, { Component } from "react";
import { Link } from "react-router-dom";
import cyf_brand from "../picture/cyf_brand.png";

export class NavigationBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <div className='page-login'><h4 >login</h4></div>
        
        {<img className="image" src={cyf_brand} alt="cyf-brand" />}
        <ul className="nav-top">
          <li className="nav-item1">
            <Link to="#">Sign In </Link>
          </li>
          |
          <li className="nav-item2">
            <Link to="#">Sign Up</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationBar;
