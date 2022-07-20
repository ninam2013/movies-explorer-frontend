import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { cardContent } from '../../utils/constants';


function MoviesCardList() {
    const found = window.innerWidth >= 320 && window.innerWidth < 767;
    return (
        <section className='movies-card-list'>
            { found ?
                 cardContent.slice(0, 5).map(item =>
                     <MoviesCard title={item.title} time={item.time} src={item.src} img={item.img} key={item.id} />)
                 :  cardContent.map(item =>
                    <MoviesCard title={item.title} time={item.time} src={item.src} img={item.img} key={item.id} />)                
            }
                 <button className='movies-card-list__buttom'>Ещё</button>
             </section>
    )  
}

export default MoviesCardList;