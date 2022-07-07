import React from 'react';
import './Techs.css';


function Techs() {


    return (
        <>
            <section className='techs'>
                <h2 className='topic-title'>Технологии</h2>
                <div className='line'></div>
                <h2 className='techs__title'>7 технологий</h2>  
                <div className='techs__wrap'>              
                    <p className='normal-text normal-text_text_center'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p> 
                </div>
                
                <ul className='techs__grid'>
                    <li className='techs__not-button'>
                        <p className='normal-text'>HTML</p>
                    </li>
                    <li className='techs__not-button'>
                        <p className='normal-text'>CSS</p>
                    </li>
                    <li className='techs__not-button'>
                        <p className='normal-text'>JS</p>
                    </li>
                    <li className='techs__not-button'>
                        <p className='normal-text'>React</p>
                    </li>
                    <li className='techs__not-button'>
                        <p className='normal-text'>Git</p>
                    </li>
                    <li className='techs__not-button'>
                        <p className='normal-text'>Express.js</p>
                    </li>
                    <li className='techs__not-button'>
                        <p className='normal-text'>mongoDB</p>
                    </li>                    
                </ul>   
            </section>

        </>
    );
}

export default Techs;
