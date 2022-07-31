import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies({ amountCards, isLoading, saveCardData, getDeleteCards }) {
    return (
        <section className='saved-movies'>
            <SearchForm isLoading={isLoading} />
            <MoviesCardList amountCards={amountCards} saveCardData={saveCardData} getDeleteCards={getDeleteCards} />
        </section>
    )
}

export default SavedMovies;