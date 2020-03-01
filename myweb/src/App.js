import React from 'react';
import logo from './logo.svg';
import {BrowserRouter ,Switch , Route } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Nav/>
      <Switch>
        <Home path='/' component={Home}/>
      </Switch>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
