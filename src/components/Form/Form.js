import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './Form.css';

function Form() {
    return (
        <div className='form'>
            <Switch>
                <Route path="/signup">
                    <form className='form__form' name="form">
                        <label className='form__label'>Имя</label>
                        <input id="u-input" className="form__input" type="text" name="username" required />
                        <label className='form__label'>E-mail</label>
                        <input id="e-input" className="form__input" type="email" name="email" required />
                        <label className='form__label'>Пароль</label>
                        <input id="p-input" className="form__input" type="password" name="password" required />
                        <button type="submit" className="form__button" >Зарегистрироваться</button>
                    </form>
                    <div className='form__wrap'>
                        <p className='form__text register__text_color_grey'> Уже зарегистрированы? </p>
                        <NavLink to="/signin" className="link-login">
                            <p className='form__text form__text_color_blue'> Войти </p>
                        </NavLink>
                    </div>
                </Route>

                <Route path="/signin">
                    <form className='form__form' name="form">
                        <label className='form__label'>E-mail</label>
                        <input id="e-input" className="form__input" type="email" name="email" required />
                        <label className='form__label'>Пароль</label>
                        <input id="p-input" className="form__input" type="password" name="password" required />
                        <button type="submit" className="form__button form__button_margin_top" >Войти</button>
                    </form>
                    <div className='form__wrap'>
                        <p className='form__text register__text_color_grey'> Ещё не зарегистрированы? </p>
                        <NavLink to="/signup" className="link-login">
                            <p className='form__text form__text_color_blue'> Регистрация </p>
                        </NavLink>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Form;