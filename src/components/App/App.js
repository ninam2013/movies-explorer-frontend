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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from '../../utils/auth.js';
import mainApi from "../../utils/MainApi";
import CurrentUserContext from '../../context/CurrentUserContext';
import { useCurrentWidth } from '../../hooks/useCurrentWidth';


function App() {

  // активация мобильного меню
  const [menuActive, setMenuActive] = useState(false);
  // кол-во карточек при определенном разрешении
  const [amountCards, setAmountCards] = useState(0);
  // все карточки
  const [cards, setCards] = useState([]);
  // сохраненные карточки
  const [savedCards, setSavedCards] = useState([]);
  // значение инпута
  const [searchText, setSearchText] = useState('');
  // значение инпута сохраненных карточек
  const [searchTextSavedCards, setSearchTextSavedCards] = useState('');
  // загрузка карточек(прелоадер)
  const [isLoading, setIsLoading] = useState(false);
  // статус пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  // ошибка на сервере
  const [cardOutputError, setCardOutputError] = useState(false);
  // данные пользователя
  const [currentUser, setCurrentUser] = useState({});


  const location = useLocation();
  const history = useHistory();
  const width = useCurrentWidth();

  useEffect(() => {
    tokenCheck();
    changeWidth(width);     // при изменении пути странички вызывается функция changeWidth
  }, []);



  // изначальная загрузка данных пользователя
  useEffect(() => {
    const token = localStorage.getItem('token');  //сохраняем токен в переменной
    if (loggedIn) {   // если залоген
      setIsLoading(true);   //включаем прелоадер
      Promise.all([
        mainApi.getMovies(token), //запрос данных карточек
        mainApi.getUser(token)    //запрос данных пользователя
      ]).then(([cards, userInfo]) => {        // приходят данные карточек и данные пользователя
        const userSavedCards = cards
          .movies.filter((m) => m.owner === currentUser._id)        // фильтруем данные карточек по id и записываем в переменную
          .map(m => {m.isSaved = true; return m;})    //добавляю значение isSaved
        ;
        localStorage.setItem('savedCards', JSON.stringify(userSavedCards));
        setSavedCards(userSavedCards);
        setCurrentUser(userInfo.data);
      })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }

  }, [loggedIn, currentUser._id]);

  // запись карточек в хранилище
  const fetchCards = () => {
    moviesApi.getMoviesBeatfilm()
      .then((res) => {
        setCards(res);
        localStorage.setItem('cards', JSON.stringify(res))
      })
      .catch((err) => setCardOutputError(true))
  }

  useEffect(() => {
    const localCards = localStorage.getItem('cards');
    if (localCards) {
      try {
        if (searchText && searchText.length > 0) {
          let savedCardsMap = {};
          for (let m of savedCards) {
            savedCardsMap[m.movieId] = true;
          }

          let localCardsList = JSON.parse(localCards);
          for (let m of localCardsList) {
            m.isSaved = !!savedCardsMap[m.id];
          }
            setCards(localCardsList)
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
  function changeWidth(width) {
    if (width >= 320 && width < 480) {
      setAmountCards(5);
    }
    if (width >= 480 && width < 768) {
      setAmountCards(5);
    }
    if (width >= 768 && width < 1280) {
      setAmountCards(7);
    }
    if (width >= 1280) {
      setAmountCards(7);
    }
  };

// вывод карточек по кнопке
  function getLoadStep(width) {
    if (width >= 1280) {
      return 3;
    }
    return 2;
  };

  // при нажатии на ещё появляются карточки
  function handleLoadMore() {
    setAmountCards((prevCount) => prevCount + getLoadStep(width))
}

  // при сабмите поиска фильма
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchText(e.target[0].value);
  }

  // при сабмите поиска сохраненных фильмов
  const handleSubmitSavedCardText = (e) => {
    e.preventDefault();
    setSearchTextSavedCards(e.target[0].value);
  }

  // поиск по названию фильма
  const getFilterСards = cards.filter(card => {
    return card.nameRU.toLowerCase().includes(searchText.toLowerCase())
  });

  // поиск по названию сохраненного фильма
  const getFilteredSavedCards = savedCards.filter(card => {
    return card.nameRU.toLowerCase().includes(searchTextSavedCards.toLowerCase())
  });

  // сохранение данных определенной карточки
  function getSavedCards(movie) {
    const token = localStorage.getItem('token');
    if (localStorage.getItem('savedCards') === null) {    // если в хранилище пусто, срабатывает этот код
      setIsLoading(true);     // включаем прелоадер
      mainApi.saveMovie(movie, token)   // делаем запрос
        .then((movieData) => {    // возвращается объект с объектами {data:{data:{значения}}}
          movieData.data.isSaved = true;
          const changeObj = [movieData.data];   // привожу в массив с объектом без data
          localStorage.setItem('savedCards', JSON.stringify(changeObj));    // записываю в хранилище как строку
          const newLocalSavedCards = JSON.parse(localStorage.getItem('savedCards'));  // записываю в переменную массив с данными
          setSavedCards(newLocalSavedCards);    // записываю в стейт как массив с объектом
        })
        .catch((err) => console.log(err))     // в обратном случае ошибка
        .finally(() => {
          setIsLoading(false);    // выключаю прелоадер
        });
    }
    if (localStorage.getItem('savedCards') !== null) {    // если в хранилище что-то есть, срабатывает этот код
      const localSavedCards = JSON.parse(localStorage.getItem('savedCards'));  // в переменную записываем массив с объектом из хранилища
      const isSaved = localSavedCards.some((m) => m.movieId === movie.id);   // проверяем одинаковые ли id из хранилища и новой карточки
      if (!isSaved) {   // если значения id разные
        setIsLoading(true);   // включаем прелоадер
        mainApi.saveMovie(movie, token)   //делаем запрос и записывем данные на сервер
          .then((movieData) => {         //возвращается объект с объектами {data:{значения}}}
            movieData.data.isSaved = true;
            const changeObj = [movieData.data];    // привожу в массив с объектом без data
            localStorage.setItem('savedCards', JSON.stringify([...localSavedCards, ...changeObj]));       // записываю в хранилище как строку
            const newLocalSavedCards = JSON.parse(localStorage.getItem('savedCards'));       // записываю в переменную
            setSavedCards(newLocalSavedCards);   //записываю в стейт как массив с объектом из локального хранилища
          })
          .catch((err) => console.log(err))      // в обратном случае ошибка
          .finally(() => {
            setIsLoading(false);       // выключаю прелоадер
          });
      }
    }
  }


  // удаление карточки
  function getDeleteCards(movie) {
    setIsLoading(true);   //включаем прелоадер
    const token = localStorage.getItem('token');  // записываем токен в переменную
    const localSavedCards = JSON.parse(localStorage.getItem('savedCards'));  // данные хранящиеся в хранилище
    mainApi.deleteCard(movie._id || movie.id, token)   // делаем запрос на удаление
      .then((res) => {
        const newCards = localSavedCards.filter((obj) => obj._id !== movie._id);  // фильтруем карточки и оставляем в переменной все кроме удаленной
        localStorage.setItem('savedCards', JSON.stringify(newCards));   // перезаписываем новые данные сохраненных карточек в хранилище
        setSavedCards(newCards);   // перезаписываем новые данные в стейт без удаленной карточки, можно такой вариант
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);    // выключаю прелоадер
      });
  }

  // регистрируем пользователя
  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((data) => {
        setCurrentUser(data);
        handleLogin(data.email, password);
      })
  }

  // авторизуемся
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);  //записываем только token
          setCurrentUser(data)
          setLoggedIn(true);
          history.push('/movies');
        }
      })
  }

  // проверка токена
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser({ name: res.data.name, email: res.data.email, id: res.data._id })
            history.push("/movies");
          }
        })
        .catch((err) => console.log(err))
    }
  }

  // выход из системы
  function signOut() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('savedCards');
    localStorage.removeItem('cards');
    setSavedCards([]);
    setCards([]);
    history.push('/');
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
            <Profile signOut={signOut} />
          </ProtectedRoute>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Movies
              pathname={location.pathname}
              amountCards={amountCards}
              handleSubmit={handleSubmit}
              cards={cards}
              getFilterСards={getFilterСards}
              getSavedCards={getSavedCards}
              getDeleteCards={getDeleteCards}
              isLoading={isLoading}
              searchText={searchText}
              cardOutputError={cardOutputError}
              savedCards={savedCards}
              handleLoadMore={handleLoadMore}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              amountCards={amountCards}
              isLoading={isLoading}
              getFilteredSavedCards={getFilteredSavedCards}
              handleSubmitSavedCardText={handleSubmitSavedCardText}
              searchTextSavedCards={searchTextSavedCards}
              getDeleteCards={getDeleteCards}
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
