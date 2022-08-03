import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import CurrentUserContext from '../../context/CurrentUserContext';

function Profile({signOut}) {
  const [profileEditing, setProfileEditing] = useState(false);
  const value = useContext(CurrentUserContext);
 
  function handleProfile(){
    setProfileEditing(true);
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {value.name}</h1>
      <div className='profile__wrap profile__wrap_border_bottom profile__wrap_padding_top'>
        <label className='profile__label profile__label_padding_bottom'>Имя
          <input required className='profile__input' type="text" name="username" value={value.name} placeholder="имя" disabled={!profileEditing}></input>
        </label>
      </div>
      <div className='profile__wrap'>
        <label className='profile__label profile__label_padding_top'>E-mail
          <input required className='profile__input' type="email" name="email" value={value.email} placeholder="email" disabled={!profileEditing}></input>
        </label>
      </div>
      {profileEditing ? 
      <button className='profile__button-save'>Сохранить</button> : 
      <>
      <Link to="#" className='profile__link' onClick={handleProfile}>Редактировать</Link>
      <Link to="#" className='profile__link profile__link_color_red profile__link_margin_top' onClick={signOut}>Выйти из аккаунта</Link>
      </>
      }



      {/* <Link to="#" className='profile__link' onClick={handleProfile}>Редактировать</Link>
      <Link to="#" className='profile__link profile__link_color_red profile__link_margin_top' onClick={signOut}>Выйти из аккаунта</Link> */}
    </section>
  )
}

export default Profile;