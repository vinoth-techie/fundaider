import React,{Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
//import Footer from './FooterComponent';
import Home from './Home';
import { Switch, Redirect } from 'react-router-dom';
//import Startups from './Startups';
import Project from './Project';
import Startups from './Startups';
import Investors from './Investors';
import Login from './login';
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
        <Switch>
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/project' component={Project} />
          <Route exact path='/startups' component={Startups} />
          <Route exact path='/investors' component={Investors} />
          <Route exact path='/login' component={Login} />
          <Redirect to="/home" />
        </Switch>
        
      </div>
    );
  }
}

export default Main;
