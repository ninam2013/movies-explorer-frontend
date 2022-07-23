import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Account from '../Account/Account';
import { userName } from '../../utils/constants';

function Navigation({ openMenu }) {


    return (
        <>
            <nav className='navigation'>
                <div className="navigation__container">
                    <NavLink to="/movies" className="link">
                        <p className="navigation__text navigation__text_active">Фильмы</p>
                    </NavLink>
                    <NavLink to="/saved-movies" className="link">
                        <p className="navigation__text navigation__text_margin_left">Сохраненные фильмы</p>
                    </NavLink>
                </div>
                <NavLink to="/profile" className="link">
                    <Account userName={userName} />
                </NavLink>
            </nav>

            <div className='burger-btn' onClick={openMenu}>
                <span className='strip' />
            </div>
        </>
    )
}

export default Navigation;
