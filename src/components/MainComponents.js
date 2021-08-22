import React,{Component} from 'react';
import Header from './HeaderComponent';
//import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

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
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={HomePage} />
          <Redirect to="/home" />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
