import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ pathname, amountCards, handleSubmit, getFilterСards, isLoading, getSavedCards, cardId, searchText , cardOutputError, savedCards }) {
    // console.log('savedCards-Movies= ', savedCards);
    return (
        <section className='movies'>
            <SearchForm 
                handleSubmit={handleSubmit}        
                isLoading={isLoading} 
                getFilterСards={getFilterСards} 
                searchText={searchText}                
            />
            <MoviesCardList
                pathname={pathname}
                amountCards={amountCards}             
                getFilterСards={getFilterСards} 
                getSavedCards={getSavedCards}
                cardId={cardId}
                cardOutputError={cardOutputError}  
                savedCards={savedCards}                                 
            />
        </section>
    )
}

export default Movies;