import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './Form.css';
import { useFormWithValidation } from '../../hooks/useForm';

function Form({
    handleRegister,
    handleLogin,
    errorText }) {

    const { values, handleChange, errors, isValid } = useFormWithValidation({});

    const onSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            handleLogin(values.email, values.password);
        }
    }

    const onSubmitRegister = (e) => {
        e.preventDefault();
        if (isValid) {
            handleRegister(values.name, values.email, values.password);
        }
    }


    return (
        <div className='form'>
            <Switch>
                <Route path="/signup">
                    <form className='form__form' name="form" onSubmit={onSubmitRegister} noValidate>
                        <label className='form__label'>Имя</label>
                        <input className="form__input" type="text" name="name" required value={values.name || ''} onChange={handleChange} minLength="2" maxLength="30" />
                        <span className="form__error" >{errors && errors["name"]}</span>
                        <label className='form__label'>E-mail</label>
                        <input className="form__input" type="email" name="email" required value={values.email || ''} onChange={handleChange}
                            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" />
                        <span className="form__error" >{errors && errors["email"]}</span>
                        <label className='form__label'>Пароль</label>
                        <input className="form__input" type="password" name="password" required value={values.password || ''} onChange={handleChange} minLength="8" />
                        <span className="form__error" >{errors && errors["password"]}</span>
                        <div className='form__wrap-button'>
                            <span className="form__error form__error_change">{errorText}</span>
                            <button type="submit" className="form__button" onSubmit={onSubmitRegister} disabled={!isValid}>Зарегистрироваться</button>
                        </div>
                    </form>
                    <div className='form__wrap'>
                        <p className='form__text register__text_color_grey'> Уже зарегистрированы? </p>
                        <Link to="/signin" className="link-login">
                            <p className='form__text form__text_color_blue'> Войти </p>
                        </Link>
                    </div>
                </Route>

                <Route path="/signin">
                    <form className='form__form' name="form" onSubmit={onSubmit} noValidate>
                        <label className='form__label'>E-mail</label>
                        <input className="form__input" type="email" name="email" required value={values.email || ''} onChange={handleChange}
                            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" />
                        <span className="form__error" >{errors && errors["email"]}</span>
                        <label className='form__label'>Пароль</label>
                        <input className="form__input" type="password" name="password" required value={values.password || ''} onChange={handleChange} minLength="8" />
                        <span className="form__error" >{errors && errors["password"]}</span>
                        <div className='form__wrap-button'>
                            <span className="form__error form__error_change">{errorText}</span>
                            <button type="submit" className="form__button" onSubmit={onSubmit} disabled={!isValid}>Войти</button>
                        </div>
                    </form>
                    <div className='form__wrap'>
                        <p className='form__text register__text_color_grey'> Ещё не зарегистрированы? </p>
                        <Link to="/signup" className="link-login">
                            <p className='form__text form__text_color_blue'> Регистрация </p>
                        </Link>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Form;