import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import moviesApi from '../../utils/MoviesApi';

function SearchForm({handleFormSubmit, handleInputChange}) {
 
    return (
        <section className='search-form'>
            <div className='search-form__wrap'>
                <form className='search-form__search' onSubmit={handleFormSubmit}>
                    <input type="text" className="search-form__input" placeholder="Фильм" required onChange={handleInputChange} />
                    <button className='search-form__button' type='submit'>Найти</button>
                </form>
                <FilterCheckbox />
            </div>
        </section>
    )
}

export default SearchForm;