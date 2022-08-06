import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Account from '../Account/Account';


function Navigation({ openMenu }) {    
    return (
        <>
            <nav className='navigation'>
                <div className="navigation__container">
                    <NavLink to="/movies" className="link" activeClassName="active-link-navigation"> 
                        <p className="navigation__text">Фильмы</p>
                    </NavLink>
                    <NavLink to="/saved-movies" className="link" activeClassName="active-link-navigation">
                        <p className="navigation__text navigation__text_margin_left">Сохраненные фильмы</p>
                    </NavLink>
                </div>
                <NavLink to="/profile" className="link">
                    <Account />
                </NavLink>
            </nav>

            <div className='burger-btn' onClick={openMenu}>
                <span className='strip' />
            </div>
        </>
    )
}

export default Navigation;
