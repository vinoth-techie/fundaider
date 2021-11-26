/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import Startups from "./Startups";
import Project from "./Project";
import Investors from "./investors/Investors";
import Community from "./community/Community";
import addUserForm from "./Form";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../fireBase/firebase";
import InvestorProfile from "./updateProfile/InvestorsProfile";
import axios from 'axios';
class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,

    };
    this.handleLogout=this.handleLogout.bind(this);
    this.addDetails=this.addDetails.bind(this);
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
      user:[],
      role:''
    });
  }

   handleLogout = async() =>{ 
     console.log("button click");
    await auth.signOut();
  }
  componentDidMount(){
      axios
        .get("http://localhost:3001/getuser")
        .then((response) => response.data)
        .then((response) => this.addDetails(response))
        .catch((error) => console.log(error));

  }
  addDetails = (data) =>{
    let findUser =data.filter((dat)=>this.props.currentUser.email===dat.email)
    console.log(findUser,"string")
    this.setState({
      ...this.state,
      user:findUser
    });
    this.state.user.map((dat)=>{
      this.setState({
        ...this.state,
        role:dat.role
      })
    })
    console.log("sfdsad",this.state.role)
  }
  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md" style={{ backgroundColor: "#512DA8" }}>
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand href="/">FundAider</NavbarBrand>
            <Collapse
              isOpen={this.state.isNavOpen}
              navbar
              style={{ justifyContent: "space-between" }}
            >
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    {" "}
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/project">
                    Projects
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/startups">
                    {" "}
                    Startups
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/investors">
                    {" "}
                    Investors
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/community">
                    {" "}
                    Community
                  </NavLink>
                </NavItem>
                {this.props.currentUser &&this.state.role==="student" && <NavItem>
                  <NavLink className="nav-link" to="/form">
                    Edit Profile
                  </NavLink>
                </NavItem>}
                {this.props.currentUser && this.state.role==="investor"&&<NavItem>
                  <NavLink className="nav-link" to="/investorform">
                    Edit Profile
                  </NavLink>
                </NavItem>}
              </Nav>
             
              <Nav navbar className = {this.props.currentUser ? "d-none":"d-block justify-content-end"}>
                <NavItem>
                  <NavLink className="nav-link" to="/login">
                    <i class="fa fa-sign-in" aria-hidden="true"></i> Login
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav navbar className = {this.props.currentUser ? "d-block justify-content-end":"d-none"}>
                <NavItem>
                  
                <Button style={{backgroundColor:'white',color:'black'}} onClick = {this.handleLogout}>Logout</Button>
                 
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
