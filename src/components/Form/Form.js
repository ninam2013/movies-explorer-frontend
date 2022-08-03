import React from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import './Form.css';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        let { name, email, password } = this.state;
        this.props.onRegister(name, email, password)
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        let { email, password } = this.state;
        if (!email || !password) {
            return;
        }
        this.props.onLogin(email, password);
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        this.setState
            ({
                [name]: target.value,
            })
    }


    render() {
        return (
            <div className='form'>
                <Switch>
                    <Route path="/signup">
                        <form className='form__form' name="form" onSubmit={this.handleSubmit}>
                            <label className='form__label'>Имя</label>
                            <input id="u-input" className="form__input" type="text" name="name" required value={this.state.name} onChange={this.handleInputChange} />
                            <label className='form__label'>E-mail</label>
                            <input id="e-input" className="form__input" type="email" name="email" required value={this.state.email} onChange={this.handleInputChange} />
                            <label className='form__label'>Пароль</label>
                            <input id="p-input" className="form__input" type="password" name="password" required value={this.state.password} onChange={this.handleInputChange} />
                            <button type="submit" className="form__button" onSubmit={this.handleSubmit}>Зарегистрироваться</button>
                        </form>
                        <div className='form__wrap'>
                            <p className='form__text register__text_color_grey'> Уже зарегистрированы? </p>
                            <Link to="/signin" className="link-login">
                                <p className='form__text form__text_color_blue'> Войти </p>
                            </Link>
                        </div>
                    </Route>

                    <Route path="/signin">
                        <form className='form__form' name="form" onSubmit={this.handleLoginSubmit}>
                            <label className='form__label'>E-mail</label>
                            <input id="e-input" className="form__input" type="email" name="email" required value={this.state.email} onChange={this.handleInputChange} />
                            <label className='form__label'>Пароль</label>
                            <input id="p-input" className="form__input" type="password" name="password" required value={this.state.password} onChange={this.handleInputChange} />
                            <button type="submit" className="form__button form__button_margin_top" onSubmit={this.handleLoginSubmit}>Войти</button>
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
}

export default withRouter(Form);