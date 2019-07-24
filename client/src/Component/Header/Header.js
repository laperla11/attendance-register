import React, { Component, Fragment } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { logout, loggedIn } from '../../Auth';


import './Header.css'


class Header extends Component {
  onLogOut = () => {
    logout();
    window.location.reload(true);
  };
  render() {

    return (

      <Navbar expand="lg" >
        <Navbar.Brand>
          <img
            className="img-responsive logo"
            src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!loggedIn() && (
              <Fragment>
                <NavItem>
                  <Nav.Link href="/#">Login</Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link href="/#/signUp" >Sign Up</Nav.Link>
                </NavItem>
              </Fragment>
            )}
            {loggedIn() && (

              <NavItem>
                <Nav.Link href="/#" onClick={this.onLogOut}>Logout</Nav.Link>
              </NavItem>


            )}

          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}
export default Header;
