import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies({ amountCards }) {
    return (
        <section className='saved-movies'>
            <SearchForm />
            <MoviesCardList amountCards={amountCards} />
        </section>
    )
}

export default SavedMovies;