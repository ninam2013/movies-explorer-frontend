import React from 'react';
import './Account.css';
import pic from '../../images/pic.svg';
import { userName } from '../../utils/constants';

function Account() {

    return (
        <div className='button-profile'>
            <p className="account-text">{userName}</p>
            <div className='pic-background'>
                <img src={pic} alt="pic" />
            </div>
        </div>
    )
}

export default Account;