<<<<<<< HEAD
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
=======
import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f


export default class Header extends React.Component {
  constructor(props) {
    super(props);

<<<<<<< HEAD
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
=======
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
    });
  }
  render() {
    return (
      <div>
<<<<<<< HEAD
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
          <img
        alt="cyf_logo"
        src='https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png'
      
        height="30"
        className="d-inline-block align-top"></img>
    
            </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
=======
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto"> <img
            className="img-responsive logo"
            src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
          /></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
              <NavItem>
                <NavLink href="/#/">Sign In</NavLink>
              </NavItem>
              <NavItem>
<<<<<<< HEAD
                <NavLink href="//">signUp</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Settings
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                   Email Reset
                  </DropdownItem>
                  <DropdownItem>
                   Password Reset
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                   Help
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
=======
                <NavLink href="/#/signUp" >Sign Up</NavLink>
              </NavItem>
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
<<<<<<< HEAD
=======

>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
