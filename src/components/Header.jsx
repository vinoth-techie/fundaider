import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, 
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Startups from './Startups';  
import Project from './Project';
import Investors from './Investors';
class Header extends Component {
  constructor(props) {
      super(props);
      this.toggleModal = this.toggleModal.bind(this);
      this.toggleNav = this.toggleNav.bind(this);
      this.state = {
        isNavOpen: false,
        isModalOpen: false
      };
    }
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
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
                      <NavbarBrand  href="/">FundAider</NavbarBrand>
                      <Collapse isOpen={this.state.isNavOpen} navbar>
                          <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/Project'>Projects</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/Startups'> Startups</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/Investors'> Investors</NavLink>
                            </NavItem>
                          </Nav>
                          <Nav navbar>
                                <NavItem className="ml-auto">
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem>
                          </Nav>
                          
                      </Collapse>
                  </div>
              </Navbar>
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                  <ModalBody>
                  <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                  </ModalBody>
              </Modal>
            </React.Fragment>
      );
  }
}

export default Header;
