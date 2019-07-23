import React from "react";
import { Link } from "react-router-dom";
import cyf from "../image/cyf_brand.png";
import "./index.css";

function Header() {

  return (

    <header className="header">
      <section className="logo">
        <img src={cyf} alt="code your future logo" />
      </section>
      <nav className="nav">
        <ul>
          <Link to="/" className="navLink"> <li>Sign in</li></Link>
          <li>|</li>
          <Link to="/signUp" className="navLink"><li>Sign up</li></Link>
        </ul>
      </nav>
    </header>



  );
}

export default Header;