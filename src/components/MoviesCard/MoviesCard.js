import React from 'react';
import './MoviesCard.css';
import { BASE_URL_MOVIE } from '../../utils/constants';



function MoviesCard({
    movie,
    pathname,
    changeLike })
{

    function handleLike(e) {
        e.preventDefault();
        changeLike(movie);
    }


    function translateTime(v) {
        let hours = Math.trunc(v / 60);
        let minutes = v % 60;
        return hours + 'ч ' + minutes + 'м';
    };

    return (
        <a href={movie.trailerLink} className='trailer-link' target='_blank' rel='noreferrer'>
            <article className='movies-card'>
                <div className='movies-card__content'>
                    <div className='movies-card__desc'>
                        <h2 className='movies-card__title'>{movie.nameRU}</h2>
                        <p className='movies-card__time'>{translateTime(movie.duration)}</p>
                    </div>
                    {pathname === '/movies' ?
                        <button className={movie.isSaved ? 'movies-card__button movies-card__button_active' : 'movies-card__button'} onClick={handleLike}></button> :
                        <button className='movies-card__button movies-card__button_cross' onClick={handleLike}></button>
                    }
                </div>
                <div className='movies-card__box-img'>
                    {pathname === '/movies' ?
                        <img className='movies-card__img' src={BASE_URL_MOVIE + movie.image.url} alt={movie.nameRU} />
                        : <img className='movies-card__img' src={movie.image} alt={movie.nameRU} />
                    }
                </div>
            </article>
        </a>
    )
}

export default MoviesCard;