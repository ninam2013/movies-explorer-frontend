import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { userName, email } from '../../utils/constants';

function Profile() {
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {userName}</h1>
      <div className='profile__wrap profile__wrap_border_bottom profile__wrap_padding_top'>
        <label className='profile__label profile__label_padding_bottom'>Имя
          <input required className='profile__input' type="text" name="username" placeholder={userName}></input>
        </label>
      </div>
      <div className='profile__wrap'>
        <label className='profile__label profile__label_padding_top'>E-mail
          <input required className='profile__input' type="email" name="email" placeholder={email}></input>
        </label>
      </div>
      <Link to="#" className='profile__link'>Редактировать</Link>
      <Link to="#" className='profile__link profile__link_color_red profile__link_margin_top'>Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;