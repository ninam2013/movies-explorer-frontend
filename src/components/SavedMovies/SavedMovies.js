import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies({
    amountCards,
    isLoading,
    handleSubmitSavedCardText,
    searchTextSavedCards,
    changeLike,
    handleChangeCheckboxSavedCards,
    searchSavedCards }) {


    return (
        <section className='saved-movies'>
            <SearchForm
                isLoading={isLoading}
                searchTextSavedCards={searchTextSavedCards}
                handleSubmitSavedCardText={handleSubmitSavedCardText}
                handleChangeCheckboxSavedCards={handleChangeCheckboxSavedCards}
                searchSavedCards={searchSavedCards}
            />
            <MoviesCardList
                amountCards={amountCards}
                changeLike={changeLike}
                searchSavedCards={searchSavedCards}
            />
        </section>
    )
}

export default SavedMovies;