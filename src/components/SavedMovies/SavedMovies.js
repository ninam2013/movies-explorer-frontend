import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies({
    amountCards,
    isLoading,
    getFilteredSavedCards,
    getDeleteCards,
    handleSubmitSavedCardText,
    searchTextSavedCards })
{


    return (
        <section className='saved-movies'>
            <SearchForm
            isLoading={isLoading}
            getFilteredSavedCards={getFilteredSavedCards}
            searchTextSavedCards={searchTextSavedCards}
            handleSubmitSavedCardText={handleSubmitSavedCardText}
            />
            <MoviesCardList
            amountCards={amountCards}
            getFilteredSavedCards={getFilteredSavedCards}
            getDeleteCards={getDeleteCards}
            />
        </section>
    )
}

export default SavedMovies;