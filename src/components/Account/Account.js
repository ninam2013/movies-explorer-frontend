import React, { useContext } from 'react';
import './Account.css';
import pic from '../../images/pic.svg';
import CurrentUserContext from '../../context/CurrentUserContext';

function Account() {
    const value = useContext(CurrentUserContext); 
    return (
        <div className='button-profile'>
            <p className="account-text">{value.name}</p>
            <div className='pic-background'>
                <img src={pic} alt="pic" />
            </div>
        </div>
    )
}

export default Account;