import React from 'react';
import './FilterCheckbox.css';


function FilterCheckbox() {
    return (
        <div className='filter-checkbox'>
            <label className='filter-checkbox__switch'>
                <input type='checkbox' className='checkbox' />
                <span className='slider' />
            </label>
            <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;