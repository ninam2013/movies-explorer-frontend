import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm() {
    return (
        <section className='search-form'>
            <div className='search-form__wrap'>
                <form className='search-form__search'>
                    <input type="text" className="search-form__input" placeholder="Фильм" required />
                    <button className='search-form__button' type='submit'>Найти</button>
                </form>
                <FilterCheckbox />
            </div>
        </section>
    )
}

export default SearchForm;