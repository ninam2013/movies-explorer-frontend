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
  const [isLoading, setIsLoading] = useState(false);
  // const [errorText, setErrorText] = useState(false);


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
    if(searchText && searchText.length > 0){
      setIsLoading(true);   
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
        })        
        setCards(dataCards);
      })
      .finally(()=> setIsLoading(false));   
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


  const handleFormSubmit = (e) => {
    e.preventDefault();     
    setSearchText(e.target[0].value);     
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
            handleFormSubmit={handleFormSubmit}
            cards={cards}
            isLoading={isLoading}          
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies 
          amountCards={amountCards}
          handleFormSubmit={handleFormSubmit}
          cards={cards}
          isLoading={isLoading} 
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
