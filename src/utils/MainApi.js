import { BASE_URL_SITE } from '../utils/constants';
import { BASE_URL_MOVIE } from '../utils/constants';


class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  // сохранение фильма
  saveMovie(movie, token) {
    return fetch(`${BASE_URL_SITE}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        country: movie.country ? movie.country : 'default',
        director: movie.director ? movie.director : 'default',
        duration: movie.duration ? movie.duration : 0,
        year: movie.year ? movie.year : 0,
        description: movie.description ? movie.description : 'default',
        image: movie.image.url ? BASE_URL_MOVIE + movie.image.url : movie.image,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU ? movie.nameRU : 'default',
        nameEN: movie.nameEN ? movie.nameEN : 'default',
        thumbnail: movie.thumbnail ? movie.thumbnail : BASE_URL_MOVIE + movie.image.formats.thumbnail.url,
        movieId: movie.id,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  // удаление фильма
  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => this._getResponseData(res));
  }

  // запрос данных пользователя
  getUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => this._getResponseData(res));
  }

  // изменение данных пользователя
  updateUserInfo(token, email, name) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        email,
        name
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject((res.status));
      })
  }

  // запрос данных фильмов
  getMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => this._getResponseData(res));
  }
};

const mainApi = new MainApi({
  baseUrl: `${BASE_URL_SITE}`
});

export default mainApi;