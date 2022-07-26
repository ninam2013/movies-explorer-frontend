import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies({ amountCards, cards, handleFormSubmit, isLoading }) {
    return (
        <section className='saved-movies'>
            <SearchForm handleFormSubmit={handleFormSubmit} isLoading={isLoading} />
            <MoviesCardList amountCards={amountCards} cards={cards} />
        </section>
    )
}

export default SavedMovies;