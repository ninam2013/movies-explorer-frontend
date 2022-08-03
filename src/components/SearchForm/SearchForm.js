import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';


function SearchForm({ handleSubmit, isLoading, getFilterСards, searchText, getFilteredSavedCards, handleSubmitSavedCardText, searchTextSavedCards }) {
    // console.log('isLoading-SearchForm ', isLoading);
    // console.log('getFilteredSavedCards-SearchForm ', getFilteredSavedCards);
    // console.log('searchText-SearchForm ', searchText);
    // console.log('searchTextSavedCards-SearchForm ', searchTextSavedCards);
    // console.log('!!getFilterСards.length-SearchForm ', !!getFilterСards.length);

    const location = useLocation();
    // console.log('getFilterСards-SearchForm ', getFilterСards);
    return (
        <section className='search-form'>
            <div className='search-form__wrap'>
                {location.pathname === '/movies' ?
                    <form className='search-form__search' onSubmit={handleSubmit} >
                        <input type="text" className="search-form__input" placeholder="Фильм" required />
                        <button className='search-form__button' type='submit'>Найти</button>
                    </form>
                    : <form className='search-form__search' onSubmit={handleSubmitSavedCardText} >
                        <input type="text" className="search-form__input" placeholder="Фильм" required />
                        <button className='search-form__button' type='submit'>Найти</button>
                    </form>
                }
                <FilterCheckbox />
            </div>

            {isLoading && <Preloader />}
            {
                location.pathname === '/movies' ?
                    (getFilterСards.length === 0 || searchText === '') && <p className='search-form__alert'> Ничего не найдено </p>
                    : (searchTextSavedCards.length === 0 || searchText === '') && <p className='search-form__alert'> Ничего не найдено </p>
            }            
        </section>
    )
}

export default SearchForm;