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
    searchSavedCards,
    searchSavedCardsCheckbox,
    checkboxSavedCards })
{

    return (
        <section className='saved-movies'>
            <SearchForm
                isLoading={isLoading}
                searchTextSavedCards={searchTextSavedCards}
                handleSubmitSavedCardText={handleSubmitSavedCardText}
                handleChangeCheckboxSavedCards={handleChangeCheckboxSavedCards}
                searchSavedCards={searchSavedCards}
                searchSavedCardsCheckbox={searchSavedCardsCheckbox}
                checkboxSavedCards={checkboxSavedCards}
            />
            <MoviesCardList
                amountCards={amountCards}
                changeLike={changeLike}
                searchSavedCards={searchSavedCards}
                searchTextSavedCards={searchTextSavedCards}
                searchSavedCardsCheckbox={searchSavedCardsCheckbox}
            />
        </section>
    )
}

export default SavedMovies;