import React from 'react';
import './FilterCheckbox.css';


function FilterCheckbox({handleChangeCheckbox, handleChangeCheckboxSavedCards, location}) {

    return (
        <div className='filter-checkbox'>
            <label className='filter-checkbox__switch'>
                {location.pathname === '/movies' ?
                <input type='checkbox' className='checkbox' onChange={handleChangeCheckbox} />
                : <input type='checkbox' className='checkbox' onChange={handleChangeCheckboxSavedCards} />
                }
                <span className='slider' />
            </label>
            <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;