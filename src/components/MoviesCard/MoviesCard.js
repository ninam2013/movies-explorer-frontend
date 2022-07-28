import React, { useState } from 'react';
import './MoviesCard.css';


function MoviesCard({ title, time, img, pathname, id, getSavedCards }) {

    //вкл-выкл лайка
    const [like, setLike] = useState(false);
    // const [cardId, setCardId] = useState([]);
    
    
    // function getSavedCards() {
    //     setLike(true);
    //     console.log('id== ', id);
    //     if(cardId !== id){
    //         setCardId([...cardId, id])    
    //     }
    //     // cardId.push(id)
    //     // setCardId([...cardId])
    //     // cardId.push(setCardId(id));
    //     // console.log('cardId== ', cardId);
    // }
    // console.log('cardId=== ', cardId);

    function onLike(){
        setLike(true);
        getSavedCards(id, title, time, img);
    }
    
    return (
        <article className='movies-card'>
            <div className='movies-card__content'>
                <div className='movies-card__desc'>
                    <h2 className='movies-card__title'>{title}</h2>
                    <p className='movies-card__time'>{time}</p>
                </div>
                {pathname === '/movies' ?
                    <button className={like ? 'movies-card__button movies-card__button_active' : 'movies-card__button'} onClick={onLike}></button> :
                    <button className='movies-card__button movies-card__button_cross'></button>
                }                
            </div>
            <div className='movies-card__box-img'>
                <img className='movies-card__img' src={img} alt={title} />
            </div>
        </article>

    )
}

export default MoviesCard;