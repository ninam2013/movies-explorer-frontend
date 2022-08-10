import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
    pathname,
    amountCards,
    handleSubmit,
    getFilterСards,
    isLoading,
    getSavedCards,
    getDeleteCards,
    cardId,
    searchText,
    cardOutputError,
    savedCards,
    handleLoadMore,
    handleChangeCheckbox,
    changeLike})
{


    return (
        <section className='movies'>
            <SearchForm
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                getFilterСards={getFilterСards}
                searchText={searchText}
                handleChangeCheckbox={handleChangeCheckbox}

            />
            <MoviesCardList
                pathname={pathname}
                amountCards={amountCards}
                getFilterСards={getFilterСards}
                cardId={cardId}
                cardOutputError={cardOutputError}
                savedCards={savedCards}
                handleLoadMore={handleLoadMore}
                changeLike={changeLike}
            />
        </section>
    )
}

export default Movies;