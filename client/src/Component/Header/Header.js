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


export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
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
              <NavItem>
                <NavLink href="/#/">Sign In</NavLink>
              </NavItem>
              <NavItem>
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
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
