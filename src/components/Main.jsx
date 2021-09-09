import React,{Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
//import Footer from './FooterComponent';
import Home from './Home';
import { Switch, Redirect } from 'react-router-dom';
//import Startups from './Startups';
import Project from './Project';
import Startups from './Startups';

class Main extends Component{

  
  render(){
    const HomePage = () => {
      return(
        <Home />
        
      );
    }
    return (
      <div>
        <Header/>
        <BrowserRouter>
        <Switch>
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/Startup' component={Startups} />
          <Route exact path='/Project' component={Project} />
          <Redirect to="/home" />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
