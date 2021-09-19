import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, 
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Startups from './Startups';  
import Project from './Project';
import Investors from './Investors';
import Community from './community/Community';
class Header extends Component {
  constructor(props) {
      super(props);
      this.toggleNav = this.toggleNav.bind(this);
      this.state = {
        isNavOpen: false,
      };
    }
    toggleNav() {
      this.setState({
        isNavOpen: !this.state.isNavOpen
      });
    }

  render() {
      return(
        <React.Fragment>
          <Navbar dark expand="md" style={{backgroundColor:'#512DA8'}}>
              <div className="container">
                  <NavbarToggler onClick={this.toggleNav} />
                  <NavbarBrand href="/">FundAider</NavbarBrand>
                  <Collapse isOpen={this.state.isNavOpen} navbar style={{justifyContent:'space-between'}}>
                      <Nav className="mr-auto" navbar>
                      <NavItem >
                            <NavLink className="nav-link" to='/home'> Home</NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="nav-link" to='/project'>Projects</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/startups'> Startups</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/investors'> Investors</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/community'> Community</NavLink>
                        </NavItem>
                      </Nav>
                      <Nav navbar className="justify-content-end">
                        <NavItem>
                          <NavLink className="nav-link" to='/login'><i class="fa fa-sign-in" aria-hidden="true"></i> Login</NavLink>
                        </NavItem>
                      </Nav>   
                  </Collapse>
              </div>
          </Navbar>
        </React.Fragment>
      );
  }
}

export default Header;
