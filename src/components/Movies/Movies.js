import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ pathname, amountCards, handleFormSubmit, cards, isLoading }) {
    return (
        <section className='movies'>
            <SearchForm handleFormSubmit={handleFormSubmit} isLoading={isLoading} />
            <MoviesCardList
                pathname={pathname}
                amountCards={amountCards}
                cards={cards}               
            />
        </section>
    )
}

export default Movies;