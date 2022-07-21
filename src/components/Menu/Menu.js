import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import { menuContent } from '../../utils/constants';
import Account from '../Account/Account';


function Menu({ closeMenu, active }) {
    return (
        <nav className={active ? 'menu active' : 'menu'} >
            <div className='blackout'></div>
            <button className='menu__close-btn' type="button" onClick={closeMenu}></button>
            <ul className='menu__content'>
                {menuContent.map(item =>
                    <li className='menu__list' key={item.id} >
                        <NavLink exact to={item.href} className="menu__link" activeClassName="active-link">{item.text}</NavLink>
                    </li>
                )}
            </ul>
            <div className='menu__wrap'>
                <Account />
            </div>
        </ nav>
    )
}

export default Menu;


