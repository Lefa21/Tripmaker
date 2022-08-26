import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Homescreen from './components/Homescreen';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Quiz from './components/Quiz';
import MapResult from './components/MapResult';
import Dash from './components/Dash';
import DashboardProfil from './components/DashboardProfil';
import DashBoardWishes from './components/DashBoardWishes';

//redux
import token from './reducers/token'
import answer from './reducers/answer';
import mail from './reducers/mail'


import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';


const store = createStore(combineReducers({ answer, token, mail }));


function App() {
  
  return (
    <Provider store={store}>

    <Router>
    <Switch>
      
      
      <Route component={Homescreen} path="/" exact/>
      <Route component={Login} path="/login" exact/>
      <Route component={SignUp} path="/signup" exact/>
      <Route component={Quiz} path="/Quiz" exact/>
      <Route component={MapResult} path="/resultat" exact/>
      {/* <Route component={Dash} path="/dash" exact/> */}
      <Route component={DashboardProfil} path="/dashboardprofil" exact/>
      <Route component={DashBoardWishes} path="/wishlist" exact/>
      
   
      

    </Switch>
  </Router>
  </Provider>

  );
}

export default App;


