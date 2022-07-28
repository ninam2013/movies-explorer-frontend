import { BASE_URL_SITE } from '../utils/constants'

class MainApi {
    constructor({ baseUrl }) {
      this.baseUrl = baseUrl;
    }
  
    getCardsRequest(){
      
    }
    
}
const mainApi = new MainApi({
    // baseUrl: BASE_URL_SITE;
    baseUrl: "https://localhost:3000"
  });
  
  export default mainApi;