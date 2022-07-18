import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Error from '../Error/Error';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';


function App() {
  const location = useLocation();
 const [menuActive, setMenuActive] = useState(false);

 function openMenu(){
  setMenuActive(true)
}

function closeMenu(){
  setMenuActive(false)
}

  return (
    <div className="page">
      <Header 
      pathname={location.pathname} 
      openMenu = {openMenu}       
      />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/movies">
          <p>Movies</p>
        </Route>
        <Route path="/error">
          <Error />
        </Route>
      </Switch>
      <Footer />
      <Menu closeMenu={closeMenu} active = {menuActive} />
    </div>
  );
}

export default App;
