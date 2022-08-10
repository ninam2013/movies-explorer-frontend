import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { errorServer } from '../../utils/constants'



function MoviesCardList({
    amountCards,
    getFilterСards,
    getSavedCards,
    getFilteredSavedCards,
    getDeleteCards,
    cardOutputError,
    handleLoadMore,
    changeLike })
{
    const loc = useLocation();


    return (
        <section className='movies-card-list'>
            {cardOutputError ? <p className='user-alert'>{errorServer}</p> :
                loc.pathname === '/movies' ?
                    getFilterСards.slice(0, amountCards).map(item =>
                        <MoviesCard
                            movie={item}
                            key={item.id}
                            pathname={loc.pathname}
                            changeLike={changeLike}
                        />) :
                        getFilteredSavedCards.slice(0, amountCards).map(item =>
                        <MoviesCard
                            movie={item}
                            key={item.movieId}
                            pathname={loc.pathname}
                            changeLike={changeLike}
                        />)
            }

            {loc.pathname === '/movies' ?
            (amountCards < getFilterСards.length || (getFilterСards.length < 3 && getFilterСards.length !== 0)) &&
                <button className='movies-card-list__buttom' onClick={handleLoadMore} >Ещё</button> :
                <button className='movies-card-list__buttom movies-card-list__buttom_visibility_hidden'>Ещё</button>
            }
        </section>
    )
}

export default MoviesCardList;