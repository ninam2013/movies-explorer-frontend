import React from 'react';
import { useHistory } from 'react-router-dom';
import './PageNotFound.css';


function PageNotFound() {
  const history = useHistory();
  return (
    <section className='error'>
      <h1 className='error__title'>404</h1>
      <p className='error__text'>Страница не найдена</p>
      <button className='error__link' onClick={() => history.goBack()}>Назад</button>
    </section>
  )
}

export default PageNotFound;