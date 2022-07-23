import React from 'react';
import './Headline.css';


function Headline({ title }) {

    return (
        <div className='headline'>
            <h2 className='topic-title'>{title}</h2>
            <div className='line'></div>
        </div>
    );
}

export default Headline;