// export default fetch('https://api.nomoreparties.co/beatfilm-movies', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     nameRU: 'Роллинг Стоунз'
//   })
//   .then((res) => {
//     console.log(res); // если всё хорошо, получили ответ
//   })
//   .catch((err) => {
//     console.log('Ошибка. Запрос не выполнен');
//   })
// });
// class MainApi {
//     constructor({ baseUrl, headers }) {
//         this._baseUrl = baseUrl;
//         this._headers = headers;
//     }

//     zapros() {
//         fetch(this._baseUrl, {
//             headers: this._headers
//         })
//             .then((res) => {
//                 res.json();
//                 // console.log('res==', res); // если всё хорошо, получили ответ
//             })
//             .catch((err) => {
//                 console.log('Ошибка. Запрос не выполнен');
//             });
//     }

// }


// export const mainApi = new MainApi({
//     baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

class MainApi {
    constructor({ baseUrl }) {
      this.baseUrl = baseUrl;
    }
  
    
}
const mainApi = new MainApi({
    // baseUrl: "https://maninep.nomoreparties.sbs"
    baseUrl: "https://localhost:3000"
  });
  
  export default mainApi;