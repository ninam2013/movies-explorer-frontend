import { BASE_URL_MOVIE } from '../utils/constants'

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    //получение ответа от сервера
  _getResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

    getMoviesBeatfilm() {
        return fetch(this._baseUrl, {
            headers: this._headers
        })
        .then(this._getResponse)            
    }
}


const moviesApi = new MoviesApi({
    baseUrl: BASE_URL_MOVIE + '/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    }
});
export default moviesApi;