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
    savedCards,
    handleLoadMore,
    handleChangeCheckbox,
    changeLike,
    searchCards }) {


    return (
        <section className='movies'>
            <SearchForm
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                searchText={searchText}
                handleChangeCheckbox={handleChangeCheckbox}
                searchCards={searchCards}
            />
            <MoviesCardList
                pathname={pathname}
                amountCards={amountCards}
                cardId={cardId}
                cardOutputError={cardOutputError}
                savedCards={savedCards}
                handleLoadMore={handleLoadMore}
                changeLike={changeLike}
                searchCards={searchCards}
            />
        </section>
    )
}

export default Movies;