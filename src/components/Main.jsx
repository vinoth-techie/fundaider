import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";
//import Footer from './FooterComponent';
import Home from "./home/Home";
import { useLocation, useHistory, Switch, Redirect } from "react-router-dom";
//import Startups from './Startups';
import Project from "./Project";
import Startups from "./Startups";
import Investors from "./investors/Investors";
import Login from "./login/Login";
import SignUp from "./signUp/SignUp";
import addUserForm from "./Form";

//import CommunityDetails from './community/CommunityDetails';
import Community from "./community/Community";
import CommunityDetails from "./community/CommunityDetails";
import InvestorDetails from "./investors/InvestorDetails";
import UpdateProfile from "./updateProfile/UpdateProfile";
import InvestorsProfile from "./updateProfile/InvestorsProfile";

function Main() {
  const location = useLocation();
  const history = useHistory();

  const {currentUser,logout}=useAuth();

  const HomePage = () => {
    return <Home />;
  };

  const CommunityPage = () => {
    return <Community history={history} />;
  };
  const CommunityDetailsPage = () => {
    return <CommunityDetails location={location} history={history} />;
  };


  const InvestorPage = () => {
    return <Investors history={history} />;
  };
  const InvestorsDetailsPage = () => {
    return <InvestorDetails location={location} history={history} />;
  }; 


  const addUserFormWithDetails = () => {
    return <UpdateProfile currentUser={currentUser} history={history} logout={logout}/>;
  };


  const investorFormWithDetails = () => {
    return <InvestorsProfile currentUser={currentUser} history={history} logout={logout}/>;
  };
  return (
    <>
      <Header currentUser={currentUser}/>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/project" component={Project} />
        <Route exact path="/startups" component={Startups} />
        <Route exact path="/investors" component={Investors} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/form" component={addUserFormWithDetails} />
        <Route exact path="/investorform" component={investorFormWithDetails} />
        <Route exact path="/community" component={CommunityPage} />
        <Route path="/community/" component={CommunityDetailsPage} />
        <Route exact path="/signup" component={SignUp} />
        <Redirect to="/home" />
      </Switch>
    </>
  );
}

export default Main;
