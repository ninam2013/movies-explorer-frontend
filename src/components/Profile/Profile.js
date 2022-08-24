import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Profile.css';
import CurrentUserContext from '../../context/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useForm';

function Profile({
  signOut,
  handleEditProfile,
  errorText,
  handleProfile,
  handleProfileBack,
  profileEditing })
{

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleEditProfile(values);
    }
  }

  const changeDisabledButton = () => {
    if ((values.name !== currentUser.name || values.email !== currentUser.email) && isValid) {
      return false;
    }
    return true;
  }

  return (
    <section className='profile'>
      <form noValidate onSubmit={onSubmit}>
        <h1 className='profile__title'>Привет, {currentUser.name}</h1>
        <div className='profile__wrap profile__wrap_border_bottom profile__wrap_padding_top'>
          <label className='profile__label profile__label_padding_bottom'>Имя
            <input required className='profile__input' type="text" name="name" value={values.name || ''} placeholder="имя" disabled={!profileEditing}
              onChange={handleChange} minLength="2" maxLength="30"></input>
          </label>
        </div>
        <span className="profile__errors">{errors && errors["name"] !== "" && errors["name"]}</span>
        <div className='profile__wrap'>
          <label className='profile__label profile__label_padding_top'>E-mail
            <input required className='profile__input' type="email" name="email" value={values.email || ''} placeholder="email" disabled={!profileEditing}
              onChange={handleChange} pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"></input>
          </label>
        </div>
        <span className="profile__errors">{errors && errors["email"] !== "" && errors["email"]}</span>
        <div className='profile__wrap profile__wrap_change'>
          {(errors && errors["email"] !== "" && errors["email"]) &&
            <span className="profile__errors profile__errors_change">{errorText}</span>}
          {profileEditing &&
          <div className='profile__block-button'>
            <button type="submit" className='profile__button-save' disabled={changeDisabledButton()} onSubmit={onSubmit}>Сохранить</button>
            <button className='profile__button-back' onClick={handleProfileBack}>Назад</button>
          </div>
          }
        </div>
      </form>
      {!profileEditing &&
        <>
          <Link to="#" className='profile__link' onClick={handleProfile}>Редактировать</Link>
          <Link to="#" className='profile__link profile__link_color_red profile__link_margin_top' onClick={signOut}>Выйти из аккаунта</Link>
        </>
      }
    </section>
  )
}

export default Profile;