import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import pic from '../../images/pic.svg';

function Header({ userName }) {


  return (
    <>
      <Route exact path="/">
        <header className="header header_background_black">
          <NavLink to="/" className="link">
            <img src={logo} className="header__logo" alt="logo" />
          </NavLink>
          <nav className="header__container-registration">
            <NavLink to="/signup" className="link">
              <p className="registration-text">Регистрация</p>
            </NavLink>
            <NavLink to="/signin" className="link">
              <div className='button-green'>
                <p className="registration-text registration-text_color_black">Войти</p>
              </div>
            </NavLink>
          </nav>
        </header>
      </Route>

      <Route path="/movies">
        <header className="header header_background_white header_location_left">
          <NavLink to="/" className="link">
            <img src={logo} className="header__logo" alt="logo" />
          </NavLink>
          <nav className="header__container-navigation ">
            <NavLink to="/movies" className="link">
              <p className="navigation-text navigation-text_active">Фильмы</p>
            </NavLink>
            <NavLink to="/saved-movies" className="link">
              <p className="navigation-text navigation-text_margin_left">Сохраненные фильмы</p>
            </NavLink>
          </nav>
          <div className="header__container-registration">
            <NavLink to="/profile" className="link">
              <div className='button-profile'>
                <p className="account-text">{ userName }</p>
                <div className='pic-background'>
                  <img src={pic} alt="pic" />
                </div>
              </div>
            </NavLink>
          </div>
        </header>
      </Route>

      <Route path="/saved-movies">
        <header className="header header_background_white header_location_left">
          <NavLink to="/" className="link">
            <img src={logo} className="header__logo" alt="logo" />
          </NavLink>
          <nav className="header__container-navigation ">
            <NavLink to="/movies" className="link">
              <p className="navigation-text">Фильмы</p>
            </NavLink>
            <NavLink to="/saved-movies" className="link">
              <p className="navigation-text navigation-text_margin_left navigation-text_active">Сохраненные фильмы</p>
            </NavLink>
          </nav>
          <div className="header__container-registration">
            <NavLink to="/profile" className="link">
              <div className='button-profile'>
                <p className="account-text">{ userName }</p>
                <div className='pic-background'>
                  <img src={pic} alt="pic" />
                </div>
              </div>
            </NavLink>
          </div>
        </header>
      </Route>

    </>
  );
}

export default Header;