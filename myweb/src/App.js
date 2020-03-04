import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router ,Switch , Route ,Link} from 'react-router-dom'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Home from './components/Home'
import Nav from './components/Nav'
import Contact from './components/Contact'
import Artical from './components/Artical'
import './App.css';
const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/artical', name: 'Artical', Component: Artical },
  { path: '/contact', name: 'Contact', Component: Contact },
]


function App() {
  return (
    <div className="App">
     {/* <BrowserRouter>
      <Nav/>
      <Route render={({location})=>{
         <TransitionGroup>
         <CSSTransition
        
          classNames='fade'
          timeout={3000}
         >
 
      <Switch location={location}>
         <Route path='/' exact component={Home}/>
         <Route path='/Artical' exact component={Artical}/>
         <Route path='/Contact' exact component={Contact}/>
       </Switch>
 
         </CSSTransition>
       </TransitionGroup>
       
      }}/>
     
     
     </BrowserRouter> */}
      <Router>
      <>
       <Nav/>
        <div className="container">
           {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}

            </Route>
             ))}
           <Route path='/Artical' exact Component={Artical}/>
            
            
           
        </div>  
      </>
    </Router>
    </div>
  );
}

export default App;
