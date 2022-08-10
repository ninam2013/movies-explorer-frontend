import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies({
    amountCards,
    isLoading,
    getFilteredSavedCards,
    handleSubmitSavedCardText,
    searchTextSavedCards,
    changeLike,
    handleChangeCheckboxSavedCards })
{


    return (
        <section className='saved-movies'>
            <SearchForm
            isLoading={isLoading}
            getFilteredSavedCards={getFilteredSavedCards}
            searchTextSavedCards={searchTextSavedCards}
            handleSubmitSavedCardText={handleSubmitSavedCardText}
            handleChangeCheckboxSavedCards={handleChangeCheckboxSavedCards}
            />
            <MoviesCardList
            amountCards={amountCards}
            getFilteredSavedCards={getFilteredSavedCards}
            changeLike={changeLike}
            />
        </section>
    )
}

export default SavedMovies;