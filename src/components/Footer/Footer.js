import React from 'react';
import './Footer.css';


function Footer({ pathname }) {

    return (
        <>
            {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') ?
                <footer className='footer'>
                    <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
                    <div className='footer__aside'>
                        <p className='footer__copyright'>© {new Date().getFullYear()}</p>
                        <nav className='footer__nav'>
                            <a href='https://practicum.yandex.ru/' className='footer__link' rel="noreferrer" target="_blank">
                                <li className='footer__box'>Яндекс.Практикум</li>
                            </a>
                            <a href='https://github.com/ninam2013' className='footer__link' rel="noreferrer" target="_blank">
                                <li className='footer__box'>Github</li>
                            </a>
                            <a href='tg://resolve?domain=ninam1982' className='footer__link' rel="noreferrer" target="_blank">
                                <li className='footer__box footer__box_padding_no'>Telegram</li>
                            </a>
                        </nav>
                    </div>
                </footer> : <></>
            }
        </>
    );
}

export default Footer;