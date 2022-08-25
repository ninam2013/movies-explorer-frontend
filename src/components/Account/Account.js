import React, { useContext } from 'react';
import './Account.css';
import pic from '../../images/pic.svg';
import CurrentUserContext from '../../context/CurrentUserContext';

function Account({loggedIn}) {
    const value = useContext(CurrentUserContext);
    const accountClassName = (
        `${!loggedIn && 'account-text'}
         ${loggedIn && 'account-text account-text_color_white'}
        `
      )
    return (
        <div className='button-profile'>
            <p className={accountClassName}>{value.name}</p>
            <div className='pic-background'>
                <img src={pic} alt="pic" />
            </div>
        </div>
    )
}

export default Account;