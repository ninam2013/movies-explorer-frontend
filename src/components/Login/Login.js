import React from 'react';
import './Login.css';
import Form from '../Form/Form';

function Login({ handleLogin, errorText }) {
  return (
    <section className='login'>
      <Form handleLogin={handleLogin} errorText={errorText} />
    </section>
  )
}

export default Login;