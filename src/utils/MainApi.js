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
  saveMovie( movie ) {    
    return fetch(`${BASE_URL_SITE}/movies`, {
      method: "POST",      
      headers: {
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
        trailer: movie.trailer ? movie.trailer : movie.trailerLink, 
        nameRU: movie.nameRU ? movie.nameRU : 'default', 
        nameEN: movie.nameEN ? movie.nameEN : 'default', 
        thumbnail: movie.thumbnail ? movie.thumbnail : BASE_URL_MOVIE + movie.image.formats.thumbnail.url, 
        movieId: movie.id
      }),
    })
      .then(res => this._getResponseData(res));
  }

  // запрос данных пользователя
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

}
const mainApi = new MainApi({
  baseUrl: `${BASE_URL_SITE}`,
  headers: {
    // authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  }
});

export default mainApi;