import React from 'react';
import BoardItem from './components/boardItem';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/login';
import BoardGroup from './components/boardGroup';
import './App.css';
       {/* <Route path="/boardGroup" exact component={BoardGroup} /> */}
function App() {
  return (<div>    
    <Router>
      {/* <Login /> */}
      <Route path="" exact component={Login} />
      <Route path="/board" exact component={BoardGroup} />
      <Route path="board/:id" component={BoardItem} /> 
    </Router>
 </div> );
}


export default App;