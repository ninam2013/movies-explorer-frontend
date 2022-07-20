import React, { useState } from 'react';
import './MoviesCard.css';


function MoviesCard({ title, time, img }) {
    const [like, setLike] = useState(false)

    function toggleLike() {
        setLike(!like);
    }

    return (
        <article className='movies-card'>
            <div className='movies-card__content'>
                <div className='movies-card__desc'>
                    <h2 className='movies-card__title'>{title}</h2>
                    <p className='movies-card__time'>{time}</p>
                </div>
                <button className={like ? 'movies-card__button movies-card__button_active' : 'movies-card__button'} onClick={toggleLike}></button>
            </div>
            <div className='movies-card__box-img'>
                <img className='movies-card__img' src={img} alt={title} />
            </div>
        </article>

    )
}

export default MoviesCard;