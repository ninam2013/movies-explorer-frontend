import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';


function SearchForm(
    {
        handleSubmit,
        isLoading,
        searchText,
        handleSubmitSavedCardText,
        searchTextSavedCards,
        handleChangeCheckbox,
        handleChangeCheckboxSavedCards,
        searchCards,
        searchSavedCards,
        searchSavedCardsCheckbox,
        checkboxSavedCards })
{

    const location = useLocation();

    return (
        <section className='search-form'>
            <div className='search-form__wrap'>
                {location.pathname === '/movies' ?
                    <form className='search-form__search' onSubmit={handleSubmit} >
                        <input type="text" className="search-form__input" placeholder="Фильм" defaultValue={JSON.parse(localStorage.getItem('searchText'))} name='movie' required />   {/* 1 */}
                        <button className='search-form__button' type='submit'>Найти</button>
                    </form>
                    : <form className='search-form__search' onSubmit={handleSubmitSavedCardText} >
                        <input type="text" className="search-form__input" placeholder="Фильм" required />
                        <button className='search-form__button' type='submit'>Найти</button>
                    </form>
                }
                <FilterCheckbox handleChangeCheckbox={handleChangeCheckbox} handleChangeCheckboxSavedCards={handleChangeCheckboxSavedCards} location={location} />
            </div>

            {isLoading && <Preloader />}
            {
                location.pathname === '/movies' ?
                    (searchCards.length === 0 && !!searchText) && <p className='search-form__alert'> Ничего не найдено </p>
                    : ((searchSavedCards.length === 0 && !!searchTextSavedCards) || (searchSavedCardsCheckbox.length === 0 && checkboxSavedCards)) && <p className='search-form__alert'> Ничего не найдено </p>
            }
        </section>
    )
}

export default SearchForm;