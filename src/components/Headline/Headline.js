import React from 'react';
import './Headline.css';


function Headline({title}) {

    return (
        <>
            <h2 className='topic-title'>{title}</h2>
            <div className='line'></div>
        </>
    );
}

export default Headline;