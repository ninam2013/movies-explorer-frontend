import React from 'react';
import './AboutProject.css';
import Headline from '../Headline/Headline';

function AboutProject() {

    return (        
            <section className='about-project'>   
                < Headline title = {"О проекте"}/>
                <div className='about-project__box-desc'>
                    <div className='about-project__stages'>
                        <h3 className='normal-title'>Дипломный проект включал 5 этапов</h3>                        
                        <p className='normal-text normal-text_padding_top'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className='about-project__time-spent'>
                        <h3 className='normal-title'>На выполнение диплома ушло 5 недель</h3>
                        <p className='normal-text normal-text_padding_top'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='about-project__box-graph'>
                    <div className='about-project__wrap-backend'>
                        <div className='about-project__backend'>
                            <p className='normal-text'>1 неделя</p>
                        </div>
                        <p className='normal-text normal-text_color_grey'>Back-end</p>
                    </div>
                    <div className='about-project__wrap-frontend'>
                        <div className='about-project__frontend'>
                            <p className='normal-text'>4 недели</p>                            
                        </div>
                        <p className='normal-text normal-text_color_grey'>Front-end</p>
                    </div>
                </div>
            </section>      
    );
}

export default AboutProject;