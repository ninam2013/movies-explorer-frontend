import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';


function SearchForm({ handleSubmit, isLoading, getFilterСards }) {
 
    return (
        <section className='search-form'>
            <div className='search-form__wrap'>
                <form className='search-form__search' onSubmit={handleSubmit} >
                    <input type="text" className="search-form__input" placeholder="Фильм" required />
                    <button className='search-form__button' type='submit'>Найти</button>                   
                </form>
                <FilterCheckbox />
            </div>
            { isLoading && <Preloader /> }
            {getFilterСards === [] && <p className='search-form__alert'> Ничего не найдено </p> }
        </section>
    )
}

export default SearchForm;