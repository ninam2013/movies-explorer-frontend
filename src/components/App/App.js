import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';
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
import { storage } from '../../utils/storage'

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
  // карточки при поиске
  const [searchCards, setSearchCards] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const width = useCurrentWidth();

  useEffect(() => {
    tokenCheck();
    changeWidth(width);
  }, []);


  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('token');
      setIsLoading(true);
      Promise.all([
        mainApi.getMovies(token),
        mainApi.getUser(token)
      ]).then(([cards, userInfo]) => {
        setCurrentUser(userInfo.data);
        setCheckbox(storage.getItem('checkbox'));
        const userSavedCards = cards
          .movies.filter((m) => m.owner === currentUser._id)
          .map(m => { m.isSaved = true; return m; })
          ;
        storage.setItem('savedCards', userSavedCards);
        setSavedCards(userSavedCards);
      })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn, currentUser._id]);


  const fetchCards = () => {
    moviesApi.getMoviesBeatfilm()
      .then((res) => {
        setCards(res);
        storage.setItem('cards', res);
      })
      .catch((err) => setCardOutputError(true))
  }


  useEffect(() => {
    const localCards = localStorage.getItem('cards');
    if (localCards) {
      try {
          setCards(JSON.parse(localCards))
      }
      catch (err) {
        localStorage.removeItem('cards');
        fetchCards();
      }
    } else {
      fetchCards();
    }
  }, [loggedIn]);


  function openMenu() {
    setMenuActive(true)
  };


  function closeMenu() {
    setMenuActive(false)
  };


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


  function getLoadStep(width) {
    if (width >= 1280) {
      return 3;
    }
    return 2;
  };


  function handleProfile() {
    setProfileEditing(true);
  }


  function handleLoadMore() {
    setAmountCards((prevCount) => prevCount + getLoadStep(width))
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    storage.setItem('searchText', e.target[0].value);
    setSearchText(storage.getItem('searchText'));
    changeWidth(width);
  }


  const handleSubmitSavedCardText = (e) => {
    e.preventDefault();
    setSearchTextSavedCards(e.target[0].value);
  }


  useEffect(() => {
    setSearchTextSavedCards('');
  }, [location.pathname])


  function handleChangeCheckbox(e) {
    if (e.target.checked) {
      storage.setItem('checkbox', true);
      setCheckbox(storage.getItem('checkbox'));
    } else {
      localStorage.removeItem('checkbox');
      setCheckbox(false);
    }
  }


  function handleChangeCheckboxSavedCards(e) {
    e.target.checked ? setCheckboxSavedCards(true) : setCheckboxSavedCards(false);
  }


  function search(cardsList, filter, isShort) {
    let filteredCards = cardsList;
    if (filter) {
      filteredCards = filteredCards.filter(card =>
        card.nameRU.toLowerCase().includes(filter.toLowerCase()));
    }
    if (isShort) {
      filteredCards = filteredCards.filter(card => card.duration <= 40);
    }
    return filteredCards;
  }


  useEffect(() => {
      let localSearchText = storage.getItem('searchText');
      const lCards = localStorage.getItem('cards');
    if(!searchText && searchText === '' && localSearchText !== ''){
      storage.setItem('searchCards', search(processedCards(lCards), localSearchText, checkbox));
      setSearchCards(storage.getItem('searchCards'));
    }

    if(searchText === null){
      setSearchCards([]);
    }

    if(!searchText && !localSearchText){
      setSearchCards([]);
    }

    if(!!searchText && searchText !== null){
    storage.setItem('searchCards', search(processedCards(lCards), searchText, checkbox));
    setSearchCards(storage.getItem('searchCards'));
    }

  }, [cards, searchText, checkbox])


  function processedCards(localCards) {
    let savedCardsMap = {};
    let localSavedCards = storage.getItem('savedCards');
    if(localSavedCards !== null){
    for (let m of localSavedCards) {
      savedCardsMap[m.nameRU] = true;
    }
    let localCardsList = JSON.parse(localCards);
    for (let m of localCardsList) {
      m.isSaved = !!savedCardsMap[m.nameRU];
    }
    return localCardsList;
  }
  return [];
  }


  const searchSavedCards = search(savedCards, searchTextSavedCards, checkboxSavedCards);
  const searchSavedCardsCheckbox = search(savedCards, false, checkboxSavedCards);


  function changeLike(movie) {
    !movie.isSaved ? saveCard(movie) : deleteCard(movie);

    let _searchCards = [...searchCards];
    let movieIndex;
    for (movieIndex in _searchCards) {
      if (_searchCards[movieIndex].nameRU === movie.nameRU) {
        break;
      }
    }
    _searchCards[movieIndex].isSaved = !movie.isSaved;
    setSearchCards(_searchCards);
  }


  function saveCard(movie) {
    const token = localStorage.getItem('token');
    if (localStorage.getItem('savedCards') === null) {
      setIsLoading(true);
      mainApi.saveMovie(movie, token)
        .then((movieData) => {
          movieData.data.isSaved = true;
          const changeObj = [movieData.data];
          storage.setItem('savedCards', changeObj);
          const newLocalSavedCards = storage.getItem('savedCards');
          setSavedCards(newLocalSavedCards);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (localStorage.getItem('savedCards') !== null) {
      const localSavedCards = storage.getItem('savedCards');
      const isSaved = localSavedCards.some((m) => m.movieId === movie.id);
      if (!isSaved) {
        setIsLoading(true);
        mainApi.saveMovie(movie, token)
          .then((movieData) => {
            movieData.data.isSaved = true;
            const changeObj = [movieData.data];
            storage.setItem('savedCards', [...localSavedCards, ...changeObj]);
            const newLocalSavedCards = storage.getItem('savedCards');
            setSavedCards(newLocalSavedCards);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }


  function deleteCard(movie) {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const localSavedCards = storage.getItem('savedCards');
    const desiredСard = localSavedCards.filter((obj) => (obj.movieId === movie.movieId) || (obj.movieId === movie.id));
    if (desiredСard.length === 0) {
      setIsLoading(false);
      return;
    }
    mainApi.deleteCard(desiredСard[0]._id, token)
      .then((res) => {
        const newCards = localSavedCards.filter((obj) => {
          return obj.nameRU !== movie.nameRU
        });
        storage.setItem('savedCards', newCards);
        setSavedCards(newCards);
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


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


  function errorSelection(err) {
    if (err === 0) {
      setErrorText('')
    }
    if (err === 200) {
      setErrorText(failMessage[0])
    }
    if (err === 409 || err === "Такой пользователь есть в базе данных") {
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


  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser({ name: res.data.name, email: res.data.email, id: res.data._id })
          } else {
            setLoggedIn(false);
            history.push('/');
          }
        })
        .catch((err) => console.log(err))
    }
  }


  function signOut() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('savedCards');
    localStorage.removeItem('cards');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('searchText');
    localStorage.removeItem('searchCards');
    setSearchCards([]);
    setSavedCards([]);
    setCards([]);
    setSearchText('');
    setSearchTextSavedCards('');
    setCheckbox(false);
    setCheckboxSavedCards(false);
    history.push('/');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          pathname={location.pathname}
          openMenu={openMenu}
          loggedIn={loggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signup">
            { loggedIn ?
              <Redirect push to="/" />
             :
             <Register handleRegister={handleRegister} errorText={errorText} />
            }
          </Route>
          <Route path="/signin">
          { loggedIn ?
              <Redirect push to="/" />
            :
            <Login handleLogin={handleLogin} errorText={errorText} />
          }
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn} >
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
              isLoading={isLoading}
              searchText={searchText}
              cardOutputError={cardOutputError}
              savedCards={savedCards}
              handleLoadMore={handleLoadMore}
              handleChangeCheckbox={handleChangeCheckbox}
              changeLike={changeLike}
              searchCards={searchCards}
              searchSavedCards={searchSavedCards}
              searchTextSavedCards={searchTextSavedCards}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              amountCards={amountCards}
              isLoading={isLoading}
              handleSubmitSavedCardText={handleSubmitSavedCardText}
              searchTextSavedCards={searchTextSavedCards}
              changeLike={changeLike}
              handleChangeCheckboxSavedCards={handleChangeCheckboxSavedCards}
              searchSavedCards={searchSavedCards}
              deleteCard={deleteCard}
              searchSavedCardsCheckbox={searchSavedCardsCheckbox}
              checkboxSavedCards={checkboxSavedCards}
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
