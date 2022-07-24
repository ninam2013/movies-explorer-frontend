import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import moviesApi from '../../utils/MoviesApi';
import { BASE_URL_MOVIE } from '../../utils/constants'


function App() {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  const [amountCards, setAmountCards] = useState(0);
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState('');

// console.log('cards', cards);

  useEffect(() => {
    changeWidth(window.innerWidth)
  }, [location.pathname]);

  useEffect(() => {
    window.onresize = function () {
      changeWidth(window.innerWidth)
    };
  });

  // вывод карточек по запросу
  useEffect(() => { 
    if(searchText.length > 0){   
    moviesApi.getMoviesBeatfilm(searchText)
      .then((res) => {
        const dataCards = res.map(card => {
          function translateTime(v) {
            let hours = Math.trunc(v / 60);
            let minutes = v % 60;
            return hours + 'ч ' + minutes + 'м';
          };
          return {
            title: card.nameRU,
            time: translateTime(card.duration),
            img: BASE_URL_MOVIE + card.image.url,
            id: card.id,
          }
        }); 
        setCards(dataCards);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен');
      });
    } 
    setCards([]);
    
  }, [searchText]);

  function openMenu() {
    setMenuActive(true)
  };

  function closeMenu() {
    setMenuActive(false)
  };

  // вывод количество карточек
  function changeWidth(changeScreen) {
    if ((changeScreen >= 320 && changeScreen < 767) && location.pathname === '/movies') {
      setAmountCards(5);
    }
    if ((changeScreen >= 320 && changeScreen < 767) && location.pathname === '/saved-movies') {
      setAmountCards(2);
    }
    if ((changeScreen >= 768 && changeScreen < 1279) && location.pathname === '/movies') {
      setAmountCards(7);
    }
    if ((changeScreen >= 768 && changeScreen < 1279) && location.pathname === '/saved-movies') {
      setAmountCards(3);
    }
    if ((changeScreen >= 1280) && location.pathname === '/movies') {
      setAmountCards(7);
    }
    if ((changeScreen >= 1280) && location.pathname === '/saved-movies') {
      setAmountCards(3);
    }
  };


  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    setSearchText(e.target[0].value)
  }

  // запись текста в state с input
  // const handleInputChange = (e) => {   
  //   setSearchText(e.target.value)
  // }
console.log(searchText);
  return (
    <div className="page">
      <Header
        pathname={location.pathname}
        openMenu={openMenu}
      />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/movies">
          <Movies
            pathname={location.pathname}
            amountCards={amountCards}
            handleFormSubmit={handleFormSubmit}
            cards={cards}
            // handleInputChange={handleInputChange}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies amountCards={amountCards} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer pathname={location.pathname} />
      <Menu closeMenu={closeMenu} active={menuActive} />
    </div>
  );
}

export default App;
