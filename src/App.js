import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/login';
import Boards from './components/boards';
import Stages from './components/stages'
import './App.css';

class App extends Component {
  render() {
    return (<div>
      <Router>
        <Login />
        {/* <Route path="/" exact component={Login} /> */}
        <Route path="/boards" exact component={Boards} />
        {/* <Route path="/boards/:id"  exact component={Stages} /> */}
      </Router>
    </div>);
  }

}


export default App;