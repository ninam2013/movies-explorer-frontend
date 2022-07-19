import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm() {
    return (
        <section className='search-form'>
            <div className='search-form__wrap'>
                <div className='search-form__search'>
                    <input type="text" className="search-form__input" placeholder="Фильм" />
                    <button className='search-form__button' type='button'>Найти</button>
                </div>
                <FilterCheckbox />
            </div>
        </section>
    )
}

export default SearchForm;