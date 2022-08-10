import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';


function Header({ pathname, openMenu, loggedIn }) {
  const headerClassName = (
    `header
      ${(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && 'header_background_white'}
       ${pathname === '/' && 'header_background_black'} ${(pathname === '/signup' || pathname === '/signin') && 'header_appearance_change'}
      `
  )
  // ${(loggedIn && pathname === '/') &&  'header_background_black'}
  let header;
  if (pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') {
    header = (<Navigation openMenu={openMenu} />)
  }
  if (pathname === '/signup') {
    header = (<h1 className='header__title'>Добро пожаловать!</h1>)
  }
  if (pathname === '/signin') {
    header = (<h1 className='header__title'>Рады видеть!</h1>)
  }

  if (pathname === '/' && loggedIn) {
    header = (<Navigation openMenu={openMenu} loggedIn={loggedIn} />)
  }

  return (
    <header className={headerClassName}>
      <NavLink to="/" className="link">
        <img src={logo} className="header__logo" alt="logo" />
      </NavLink>
      {pathname === '/' && !loggedIn ?
        <nav className="header__container-registration">
          <NavLink to="/signup" className="link">
            <p className="registration-text">Регистрация</p>
          </NavLink>
          <NavLink to="/signin" className="link">
            <div className='button-green'>
              <p className="registration-text registration-text_color_black">Войти</p>
            </div>
          </NavLink>
        </nav> :
        header
      }
    </header>
  );
}

export default Header;