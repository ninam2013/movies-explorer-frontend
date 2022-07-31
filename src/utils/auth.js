import { BASE_URL_SITE } from '../utils/constants'


export const register = (name, email, password) => {
  return fetch(`${BASE_URL_SITE}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
    .then((res) => {         
      return res.json();
    })
    .then((res) => {          
      return res
    })
    .catch((err) => console.log(err));
};


export const authorize = (email, password) => {
  return fetch(`${BASE_URL_SITE}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response => response.json()))
    .then((data) => {      
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    })
    .catch(err => console.log(err))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL_SITE}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
} 