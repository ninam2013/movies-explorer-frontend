import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ pathname, amountCards }) {
    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList pathname={pathname} amountCards={amountCards} />
        </section>
    )
}

export default Movies;