import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList({ amountCards, getFilterСards, getSavedCards, saveCardData }) {
    const loc = useLocation();
 
    return (
        <section className='movies-card-list'>            
            {loc.pathname === '/movies' ?
            getFilterСards.slice(0, amountCards).map(item =>
                <MoviesCard
                    title={item.title}
                    time={item.time}                    
                    img={item.img}
                    id={item.id}
                    key={item.id}
                    pathname={loc.pathname}
                    getSavedCards={getSavedCards}                                    
                />):                
                saveCardData.slice(0, amountCards).map(item =>
                    <MoviesCard
                        title={item.title}
                        time={item.time}                    
                        img={item.img}
                        key={item.id}
                        pathname={loc.pathname}                    
                    />)
            }

            {loc.pathname === '/movies' ?
                <button className='movies-card-list__buttom'>Ещё</button> :
                <button className='movies-card-list__buttom movies-card-list__buttom_visibility_hidden'>Ещё</button>
            }
        </section>
    )
}

export default MoviesCardList;