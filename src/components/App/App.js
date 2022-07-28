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
  // активация мобильного меню
  const [menuActive, setMenuActive] = useState(false);
  // кол-во карточек при определенном разрешении
  const [amountCards, setAmountCards] = useState(0);
  // все карточки
  const [cards, setCards] = useState([]);
  // сохраненные карточки
  const [savedCards, setsavedCards] = useState([]);
  // значение инпута
  const [searchText, setSearchText] = useState('');
  // загрузка карточек(прелоадер)
  const [isLoading, setIsLoading] = useState(false);
  //сохранение понравившихся карточек
  const [saveCardData, setSaveCardData] = useState([]);
  // const [errorText, setErrorText] = useState(false);


  // при изменении пути странички вызывается функция changeWidth 
  useEffect(() => {
    changeWidth(window.innerWidth)
  }, [location.pathname]);

  // при изменении разрешения окна меняется кол-во карточек 
  useEffect(() => {
    window.onresize = function () {
      changeWidth(window.innerWidth)
    };
  });

  // вывод карточек по запросу
  useEffect(() => {
    if (searchText && searchText.length > 0) {
      setIsLoading(true);
      moviesApi.getMoviesBeatfilm()
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
          })
          setCards(dataCards);
        })
        .finally(() => setIsLoading(false));
    }
    setCards([]);

  }, [searchText]);

  // открыть мобильное меню
  function openMenu() {
    setMenuActive(true)
  };

  // закрыть мобильное меню
  function closeMenu() {
    setMenuActive(false)
  };

  // вывод количества карточек в зависимости от разрешения экрана
  function changeWidth(changeScreen) {
    if ((changeScreen >= 320 && changeScreen < 480) && location.pathname === '/movies') {
      setAmountCards(5);
    }
    if ((changeScreen >= 320 && changeScreen < 480) && location.pathname === '/saved-movies') {
      setAmountCards(5);
    }
    if ((changeScreen >= 480 && changeScreen < 1279) && location.pathname === '/movies') {
      setAmountCards(8);
    }
    if ((changeScreen >= 480 && changeScreen < 1279) && location.pathname === '/saved-movies') {
      setAmountCards(8);
    }
    if ((changeScreen >= 1280) && location.pathname === '/movies') {
      setAmountCards(12);
    }
    if ((changeScreen >= 1280) && location.pathname === '/saved-movies') {
      setAmountCards(12);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchText(e.target[0].value);
  }

  // поиск по названию фильма
  const getFilterСards = cards.filter(card => {
    return card.title.toLowerCase().includes(searchText.toLowerCase())
  });

  // сохранение данных определенной карточки
  function getSavedCards(id, title, time, img) {
    if (!saveCardData.some(item => item === id) || saveCardData === []) {
      saveCardData.push({ id, title, time, img });
    }
  }



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
            handleSubmit={handleSubmit}
            cards={cards}
            getFilterСards={getFilterСards}
            getSavedCards={getSavedCards}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            amountCards={amountCards}            
            isLoading={isLoading}
            saveCardData={saveCardData}
          />
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
