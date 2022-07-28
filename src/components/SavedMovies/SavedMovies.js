import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies({ amountCards, isLoading, saveCardData }) {
    return (
        <section className='saved-movies'>
            <SearchForm isLoading={isLoading} />
            <MoviesCardList amountCards={amountCards} saveCardData={saveCardData}   />
        </section>
    )
}

export default SavedMovies;