import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";

import './index.css'


function HeaderLogout() {
  return (

    <Navbar expand="lg">
      <Navbar.Brand>
        <img
          className="img-responsive logo"
          src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavItem>
            <Nav.Link href="/#">Logout</Nav.Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
}
export default HeaderLogout;
