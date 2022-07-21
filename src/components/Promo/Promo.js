import React from 'react';
import './Promo.css';
import planetWeb from '../../images/planet-web.png';


function Promo() {


  return (
    <section className='promo'>
      <div className='promo__description'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className='promo__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className='promo__button' href='#about'>Узнать больше</a>
      </div>
      <div className='promo__img'>
        <img src={planetWeb} className="planet-img" alt="картинка планеты" />
      </div>
    </section>
  );
}

export default Promo;