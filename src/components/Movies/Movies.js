import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ pathname, amountCards, handleSubmit, getFilterСards, isLoading, getSavedCards, cardId, searchText , cardOutputError}) {
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
            />
        </section>
    )
}

export default Movies;