import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
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
// import { BASE_URL_MOVIE } from '../../utils/constants'
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from '../../utils/auth.js';
import mainApi from "../../utils/MainApi";
import CurrentUserContext from '../../context/CurrentUserContext'


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
  // сохранение понравившихся карточек
  const [saveCardData, setSaveCardData] = useState([]);
  // статус пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  // ошибка на сервере
  const [cardOutputError, setCardOutputError] = useState(false);
  // данные пользователя
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

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

  // запись карточек в хранилище
  const fetchCards = () => {
    moviesApi.getMoviesBeatfilm()
      .then((res) => {
        // setCards(res);
        localStorage.setItem('cards', JSON.stringify(res))
      })
      .catch((err) => setCardOutputError(true))
  }

  useEffect(() => {
    const token = localStorage.getItem('cards');

    if (token) {
      try {
        if (searchText && searchText.length > 0) {
          // setIsLoading(true);
          setCards(JSON.parse(token))
          // setIsLoading(false)              
        }
      }
      catch (err) {
        localStorage.removeItem('cards');
        fetchCards();
      }
    } else {
      fetchCards();
    }
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

  // при сабмите поиска фильма
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchText(e.target[0].value);
  }

  // поиск по названию фильма
  const getFilterСards = cards.filter(card => {
    return card.nameRU.toLowerCase().includes(searchText.toLowerCase())
  });



  // сохранение данных определенной карточки
  function getSavedCards(movie) {
    setIsLoading(true);
    mainApi.saveMovie(movie)
      .then((movie) => {
        setSaveCardData(movie)
        console.log('SaveCardData== ', saveCardData);
        // if (!saveCardData.some(item => item === movie.id) || saveCardData.length === 0) {
        //   saveCardData.push(movie);
        // }
        localStorage.setItem('saveCardData', JSON.stringify(movie));

        // setMovies(movies.map((m) => m.id === movie.movieId ? movie : m));
        // const newSavedMovies = [movie, ...localSavedMovies];
        // localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        // setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(err)
        setCardOutputError(true)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // удаление определенной карточки
  // function getDeleteCards(id, title, time, img) {  
  //   if (!saveCardData.some(item => item.id === id)) {
  //     saveCardData.shift({ id, title, time, img });
  //     console.log('id== ', id ); 
  //   }
  // }

  //   const handleRegister = (username, password, email) => {
  //     return auth
  //         .register(username, password, email)
  //         .then(() => {
  //             history.push('/signin');
  //         });
  // }

  // const handleLogin = (email, password) => {
  //   return auth
  //       .authorize(email, password)
  //       .then((data) => {
  //           if (!data.jwt) {
  //               return;
  //           }
  //           localStorage.setItem('jwt', data.jwt);

  //           setLoggedIn(true)
  //       });
  // }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((data) => {
        console.log('dataRegister= ', data);
        setCurrentUser(data);
        localStorage.setItem('token', data);
        history.push('/signin');
      })
  }
  console.log('currentUser== ', currentUser);
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        console.log('dataLogin= ', data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          setCurrentUser(data)
          setLoggedIn(true);
          history.push('/movies');
        }
      })
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser({name:res.data.name, email:res.data.email, id:res.data._id})
            history.push("/movies");
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          pathname={location.pathname}
          openMenu={openMenu}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Movies
              pathname={location.pathname}
              amountCards={amountCards}
              handleSubmit={handleSubmit}
              cards={cards}
              getFilterСards={getFilterСards}
              getSavedCards={getSavedCards}
              isLoading={isLoading}
              searchText={searchText}
              cardOutputError={cardOutputError}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              amountCards={amountCards}
              isLoading={isLoading}
              saveCardData={saveCardData}
            // getDeleteCards={getDeleteCards}        
            />
          </ProtectedRoute>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <Footer pathname={location.pathname} />
        <Menu closeMenu={closeMenu} active={menuActive} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
