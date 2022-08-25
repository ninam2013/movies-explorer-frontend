import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
    pathname,
    amountCards,
    handleSubmit,
    isLoading,
    cardId,
    searchText,
    cardOutputError,
    handleLoadMore,
    handleChangeCheckbox,
    changeLike,
    searchCards,
    searchSavedCards,
    searchTextSavedCards })
{


    return (
        <section className='movies'>
            <SearchForm
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                searchText={searchText}
                handleChangeCheckbox={handleChangeCheckbox}
                searchCards={searchCards}
                searchSavedCards={searchSavedCards}
            />
            <MoviesCardList
                pathname={pathname}
                amountCards={amountCards}
                cardId={cardId}
                cardOutputError={cardOutputError}
                handleLoadMore={handleLoadMore}
                changeLike={changeLike}
                searchCards={searchCards}
                searchSavedCards={searchSavedCards}
                searchTextSavedCards={searchTextSavedCards}
            />
        </section>
    )
}

export default Movies;