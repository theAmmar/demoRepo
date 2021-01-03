import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Login } from './login';
import { Country } from './country';

import './App.css';


class App extends Component {
  render() {
    return (  
      <div>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/country' component={Country}/>
      </Switch>  
      </div>
    );
  }
}

export default App;