import React from 'react';
import './FilterCheckbox.css';
import { storage } from '../../utils/storage'


function FilterCheckbox({
    handleChangeCheckbox,
    handleChangeCheckboxSavedCards,
    location })
{

    return (
        <div className='filter-checkbox'>
            <label className='filter-checkbox__switch'>
                {location.pathname === '/movies' ?
                    <input type='checkbox' className='checkbox' onChange={handleChangeCheckbox} checked={!!storage.getItem('checkbox')} />
                    : <input type='checkbox' className='checkbox' onChange={handleChangeCheckboxSavedCards} />
                }
                <span className='slider' />
            </label>
            <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;