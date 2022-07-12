import React from 'react';
import './Portfolio.css';


function Portfolio() {


    return (
        <section className='portfolio'>
            <h3 className='portfolio__subtitle'>Портфолио</h3>
            <ul className='portfolio__wrap'>

                <li className='box-list'>
                    <a href='https://ninam2013.github.io/how-to-learn/' className='site-link' rel="noreferrer" target="_blank">
                        <p className='site-info site-info_padding-top_none'>Статичный сайт</p>
                        <div class="arrow arrow_top_change"></div>
                    </a>
                </li>

                <li className='box-list'>
                    <a href='https://ninam2013.github.io/russian-travel/' className='site-link' rel="noreferrer" target="_blank">
                        <p className='site-info'>Адаптивный сайт</p>
                        <div class="arrow"></div>
                    </a>
                </li>

                <li className='box-list'>
                    <a href='https://maninep.nomoredomains.xyz/' className='site-link' rel="noreferrer" target="_blank">
                        <p className='site-info site-info_padding-bottom_none'>Одностраничное приложение</p>
                        <div class="arrow"></div>
                    </a>
                </li>

            </ul>
        </section>
    );
}

export default Portfolio;