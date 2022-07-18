import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import { menuContent } from '../../utils/constants';
import Account from '../Account/Account';


function Menu({ closeMenu, active }) {  
    return (
        <nav className={active ? 'menu active' : 'menu'} >
            <button className='menu__close-btn' type="button" onClick={closeMenu}></button>
            <div className='blackout'></div>
            <ul className='menu__content'>
                {menuContent.map(item =>
                    <li className='menu__list'><NavLink exact to={item.href} className="menu__link" activeClassName="active-link">{item.text}</NavLink></li>
                )}
            </ul>
            <Account />
        </ nav>
            )       
}

            export default Menu;


