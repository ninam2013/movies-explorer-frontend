import React from 'react';
// import { Route } from 'react-router-dom';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function Main() {

  return (
    <>
      <Promo />
      <AboutProject />
      <Techs />
    </>
  );
}

export default Main;