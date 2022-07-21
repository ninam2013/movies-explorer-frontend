import React from 'react';
import './AboutMe.css';
import Headline from '../Headline/Headline';
import face from '../../images/face.jpg';


function AboutMe() {

    return (
        <section className='about-me'>
            < Headline title={"Студент"} />
            <div className='about-me__container'>
                <div className='about-me__brief'>
                    <div className='about-me__wrap'>
                        <h2 className='about-me__title'>Евгений</h2>
                        <h3 className='about-me__subtitle'>Фронтенд-разработчик, 40 лет</h3>
                        <p className='about-me__text'>Я родился и живу в Оренбурге, закончил архетектурно-строительный факультет Оренбургского Государственного университета.
                            У меня есть жена и трое детей. Свободное время люблю проводить с семьёй. Начал изучать веб-разработку с 2019г., а в данный момент
                            ушёл с постоянной работы для более продуктивного изучения и поиска работы в новой сфере.</p>
                    </div>
                    <nav className='about-me__link'>
                        <li className='no-dot'><a href="tg://resolve?domain=ninam1982" className="application-link" rel="noreferrer" target="_blank">Telegram</a></li>
                        <li className='no-dot'><a href="https://github.com/ninam2013" className="application-link" rel="noreferrer" target="_blank">github</a></li>
                    </nav>
                </div>
                <div className='about-me__avatar'>
                    <img src={face} className="about-me__face" alt="лицо" />
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
