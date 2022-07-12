import React from 'react';
import './Techs.css';
import Headline from '../Headline/Headline';

function Techs() {


    return (
        <section className='techs'>        
            < Headline title = {"Технологии"}/>
            <h2 className='techs__subtitle techs__subtitle_padding_set'>7 технологий</h2>
            <div className='techs__wrap'>
                <p className='techs__text techs__text_align_center'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>

            <ul className='techs__grid'>
                <li className='techs__not-button'>
                    <p className='techs__text'>HTML</p>
                </li>
                <li className='techs__not-button'>
                    <p className='techs__text'>CSS</p>
                </li>
                <li className='techs__not-button'>
                    <p className='techs__text'>JS</p>
                </li>
                <li className='techs__not-button'>
                    <p className='techs__text'>React</p>
                </li>
                <li className='techs__not-button'>
                    <p className='techs__text'>Git</p>
                </li>
                <li className='techs__not-button'>
                    <p className='techs__text'>Express.js</p>
                </li>
                <li className='techs__not-button'>
                    <p className='techs__text'>mongoDB</p>
                </li>
            </ul>
        </section>
    );
}

export default Techs;
