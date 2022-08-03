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

  useEffect(() => {  
    const token = localStorage.getItem('token');  //сохраняем токен в переменной 
    console.log('loggedIn= ', loggedIn );   
    if (loggedIn) {   // если залоген
      setIsLoading(true);   //включаем прелоадер
      Promise.all([
        mainApi.getMovies(token), //запрос данных карточек
        mainApi.getUser(token)    //запрос данных пользователя
      ]).then(([cards, userInfo]) => {        // приходят данные карточек и данные пользователя
        console.log('cards= ', cards.movies, 'userInfo= ', userInfo.data, 'currentUser.id= ', currentUser.id );
        const userSavedCards = cards.movies.filter((m) => {        // фильтруем данные карточек по id и записываем в переменную        
          return m.owner === (currentUser.id || currentUser._id)
        })
        console.log('userSavedCards= ', userSavedCards );

        localStorage.setItem('savedCards', JSON.stringify(userSavedCards));
        setSavedCards(userSavedCards);
        setCurrentUser(userInfo.data);
       
        // if (localStorage.getItem('beatFilmMovies')) {
        //   setBeatfilmMovies(JSON.parse(localStorage.getItem('beatFilmMovies')));
        // }
      })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }

  }, [loggedIn, currentUser.id]);

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
          // setIsLoading(true);
          setCards(JSON.parse(localCards))
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
    console.log('movie Корень= ', movie); // приходит объект
    const token = localStorage.getItem('token');
    console.log('localStorage= ', localStorage.getItem('savedCards') === null);
    if (localStorage.getItem('savedCards') === null) {    //если в хранилище пусто, срабатывает этот код
      setIsLoading(true);     //включаем прелоадер
      mainApi.saveMovie(movie, token)   //делаем запрос
        .then((movie) => {    //возвращается объект с объектами {data:{data:{значения}}}     
          const movieArr = [movie.data];
          console.log('movie1= ', movie);
          console.log('movieArr1= ', movieArr);
          localStorage.setItem('savedCards', JSON.stringify(movieArr));    // записываю в хранилище как строку 
          const newLocalSavedMovies = JSON.parse(localStorage.getItem('savedCards'));  // записываю в переменную массив с данными
          console.log('newLocalSavedMovies1=', newLocalSavedMovies);
          setSavedCards(newLocalSavedMovies);    //записываю в стейт как массив с объектом
          console.log('savedCards1= ', savedCards);
        })
        .catch((err) => console.log(err))     // в обратном случае ошибка
        .finally(() => {
          setIsLoading(false);    // выключаю прелоадер
        });
    }

    if (localStorage.getItem('savedCards') !== null) {    //если в хранилище что-то есть, срабатывает этот код
      const localSavedMovies = JSON.parse(localStorage.getItem('savedCards'));  // в переменную записываем массив с объектом из хранилища   
      const isSaved = localSavedMovies.some((m) => m.movieId === movie.id);   // проверяем одинаковые ли id из хранилища и новой карточки
      if (!isSaved) {   // если значения id разные
        setIsLoading(true);   //включаем прелоадер
        mainApi.saveMovie(movie, token)   //делаем запрос и записывем данные на сервер
          .then((movie) => {         //возвращается объект с объектами {data:{data:{значения}}}

            const movieArr = [movie.data];    // привожу в массив с объектом         
            localStorage.setItem('savedCards', JSON.stringify([...localSavedMovies, ...movieArr]));       // записываю в хранилище как строку
            const newLocalSavedMovies = JSON.parse(localStorage.getItem('savedCards'));       // записываю в переменную 
            console.log('newLocalSavedMovies=', newLocalSavedMovies);
            setSavedCards(newLocalSavedMovies);   //записываю в стейт как массив с объектом из локального хранилища
            console.log('SavedCards= ', savedCards);
          })
          .catch((err) => console.log(err))      // в обратном случае ошибка
          .finally(() => {
            setIsLoading(false);       // выключаю прелоадер
          });
      }
    }
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
              isLoading={isLoading}
              searchText={searchText}
              cardOutputError={cardOutputError}
              savedCards={savedCards}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              amountCards={amountCards}
              isLoading={isLoading}
              getFilteredSavedCards={getFilteredSavedCards}
              handleSubmitSavedCardText={handleSubmitSavedCardText}
              searchTextSavedCards={searchTextSavedCards}
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
