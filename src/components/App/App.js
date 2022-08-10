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
import { failMessage } from '../../utils/constants';

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
  //вкл/выкл чекбокс
  const [checkbox, setCheckbox] = useState(false);
  //вкл/выкл чекбокс сохраненных карточек
  const [checkboxSavedCards, setCheckboxSavedCards] = useState(false);
  // ошибка на сервере
  const [cardOutputError, setCardOutputError] = useState(false);
  // ошибки
  const [errorText, setErrorText] = useState('');
  // данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  // видимость кнопок в профиле
  const [profileEditing, setProfileEditing] = useState(false);

  console.log('errorText===', errorText)
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
    if (loggedIn) {   // если залогинен
      setIsLoading(true);   //включаю прелоадер
      Promise.all([
        mainApi.getMovies(token), //запрос данных карточек
        mainApi.getUser(token)    //запрос данных пользователя
      ]).then(([cards, userInfo]) => {        // приходят данные карточек и данные пользователя
        const userSavedCards = cards
          .movies.filter((m) => m.owner === currentUser._id)        // фильтруем данные карточек по id
          .map(m => { m.isSaved = true; return m; })    // добавляю значение isSaved = true
          ;
        localStorage.setItem('savedCards', JSON.stringify(userSavedCards));    // записываю данные карточек в хранилище
        setSavedCards(userSavedCards);  // записываю данные карточек в стейт
        setCurrentUser(userInfo.data);  // записываю данные пользователя в стейт
      })
        .catch((err) => console.log(err))   // если что-то не так вывожу ошибку
        .finally(() => {
          setIsLoading(false);    // выключаю прелоадер
        });
    }

  }, [loggedIn, currentUser._id]);

  // запись карточек на сервер, в стейт и хранилище
  const fetchCards = () => {
    moviesApi.getMoviesBeatfilm()   // делаю запрос на сервер beatfilm-movies
      .then((res) => {
        setCards(res);   // записываю данные карточек с сервера в стейт
        localStorage.setItem('cards', JSON.stringify(res)) // записываю данные карточек с сервера в хранилище
      })
      .catch((err) => setCardOutputError(true))     // если что-то пошло не так выдаю ошибку
  }

  useEffect(() => {
    const localCards = localStorage.getItem('cards');   // записываем в переменную данные из хранилища
    if (localCards) {   // если в переменной данные есть
      try {
        if (searchText && searchText.length > 0) {      // если заполнен поиск
          let savedCardsMap = {};
          for (let m of savedCards) {     // перебираем сохраненные карточки
            savedCardsMap[m.movieId] = true;
          }
          let localCardsList = JSON.parse(localCards);
          for (let m of localCardsList) {     // перебираем и добавляем значение isSaved
            m.isSaved = !!savedCardsMap[m.id];
          }
          setCards(localCardsList)    //записываем в стейт данные карточек localCardsList
        }
      }
      catch (err) {       // если что-то пошло не так
        localStorage.removeItem('cards');   // удаляем данные из локального хранилища
        fetchCards();     // добавляем данные с сервера
      }
    } else {    // если в переменной данных нет
      fetchCards(); // добавляем данные с сервера
    }
  }, [searchText]);     // срабатывает если введен поиск


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

  // при нажатии на кнопку "редактирование" происходит изменение странички
  function handleProfile() {
    setProfileEditing(true);
  }

  // при нажатии на "ещё" появляются карточки
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

  // изменение согласно чекбокса
  function handleChangeCheckbox(e) {
    if (e.target.checked) {
      setCheckbox(true);
      // const getFilterСardsСhecked = getFilterСards.filter(card => {
      //   return card.duration <= 40;
      // })
    } else {
      setCheckbox(false);
    }
  }


  // изменение согласно чекбокса сохраненные карточки
  function handleChangeCheckboxSavedCards(e) {
    if (e.target.checked) {
      setCheckboxSavedCards(true);
      // const getFilterСardsСhecked = getFilterСards.filter(card => {
      //   return card.duration <= 40;
      // })
    } else {
      setCheckboxSavedCards(false);
    }
  }

  // поиск по названию сохраненного фильма
  const getFilteredSavedCards = savedCards.filter(card => {
    return card.nameRU.toLowerCase().includes(searchTextSavedCards.toLowerCase())
  });


  const handleGeneralSearch = () => {     // общая функция поиска
    if (searchText) {         // текст введенный в поисковике
      return cards.filter(card => card.nameRU.toLowerCase().includes(searchText.toLowerCase()))
    }

    if (checkbox) {     // флажок всех карточек
      return cards.filter(card => card.duration <= '40')   // вот здесь должна быть вместо cards зависимость от верхнего if, так и без неё
    }

    if (searchTextSavedCards) {   // текст введенный в поисковике сохраненных фильмов
      return savedCards.filter(card => card.nameRU.toLowerCase().includes(searchTextSavedCards.toLowerCase()))
    }

    if (handleChangeCheckboxSavedCards) {   // флажок сохраненных карточек
      return savedCards.filter(card => card => card.duration <= '40')   // вот здесь должна быть вместо savedCards зависимость от верхнего if, так и без неё
    }
  }

  let jointSearch = handleGeneralSearch()  // присваиваю значение функции в переменную и при помощи переменной вывожу карточки

  console.log('jointSearch=', jointSearch);   //если выводить по одному if, то условие отрабатывает. Если выводить все разом выводиться только верхний if

  // определяю сохранять или удалять карточку
  function changeLike(movie) {
    console.log('movie-changeLike', movie);
    if (!movie.isSaved) {
      getSavedCards(movie);    // добавляем карточку в избранное
      console.log('добавляем', movie);
    } if (movie.isSaved) {
      console.log('удаляем', movie);
      getDeleteCards(movie); // удаляем карточку из избранного
    }
  }

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
    const desiredСard = localSavedCards.filter((obj) => (obj.movieId === movie.id) || (obj.movieId === movie.movieId));  // привожу к одному виду
    console.log('desiredСard', desiredСard);
    mainApi.deleteCard(desiredСard[0]._id, token)   // делаем запрос на удаление
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

  // изменение профиля
  const handleEditProfile = ({ email, name }) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    mainApi.updateUserInfo(token, email, name)
      .then((res) => {
        if (res) {
          setCurrentUser({ email: res.email, name: res.name, _id: res._id });
          errorSelection(200);
          setTimeout(() => errorSelection(0), 3000);
          setProfileEditing(false);
        }
      })
      .catch((err) => {
        errorSelection(err)
        setTimeout(() => errorSelection(0), 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // определение ошибок
  function errorSelection(err) {
    if (err === 0) {
      setErrorText('')
    }
    if (err === 200) {
      setErrorText(failMessage[0])
    }
    if (err === 409 || err === "Такой пользователь есть в базе данных" ) {
      setErrorText(failMessage[1])
    }
    if (err === 400) {
      setErrorText(failMessage[2])
    }
    if (err === "Неверная авторизация") {
      setErrorText(failMessage[3])
    }
    if (err === "500") {
      setErrorText(failMessage[4])
    }

  }

  // регистрируем пользователя
  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((data) => {
        if (data && !data.message) {
          setCurrentUser(data);
          handleLogin(data.email, password);
        } else {
          errorSelection(data.message);
          setTimeout(() => errorSelection(0), 3000)
        }
      })
      .catch((err) => {
        errorSelection(err.message);
        setTimeout(() => errorSelection(0), 3000)
      })
  }

  // авторизуемся
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setCurrentUser(data)
          setLoggedIn(true);
          history.push('/movies');
        } else {
          errorSelection(data)
          setTimeout(() => errorSelection(0), 3000);
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        errorSelection(err);
        setTimeout(() => errorSelection(0), 3000)
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
          } else {
            setLoggedIn(false);
            history.push('/');
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
            <Register handleRegister={handleRegister} errorText={errorText} />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} errorText={errorText} />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              signOut={signOut}
              handleEditProfile={handleEditProfile}
              errorText={errorText}
              handleProfile={handleProfile}
              profileEditing={profileEditing}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Movies
              pathname={location.pathname}
              amountCards={amountCards}
              handleSubmit={handleSubmit}
              cards={cards}
              getFilterСards={getFilterСards}
              isLoading={isLoading}
              searchText={searchText}
              cardOutputError={cardOutputError}
              savedCards={savedCards}
              handleLoadMore={handleLoadMore}
              handleChangeCheckbox={handleChangeCheckbox}
              changeLike={changeLike}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              amountCards={amountCards}
              isLoading={isLoading}
              getFilteredSavedCards={getFilteredSavedCards}
              handleSubmitSavedCardText={handleSubmitSavedCardText}
              searchTextSavedCards={searchTextSavedCards}
              changeLike={changeLike}
              handleChangeCheckboxSavedCards={handleChangeCheckboxSavedCards}
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
