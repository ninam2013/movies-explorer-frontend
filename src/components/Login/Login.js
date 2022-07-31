import React from 'react';
import './Login.css';
import Form from '../Form/Form';

function Login({ onLogin }) { 
  return (
    <section className='login'>
      <Form onLogin={onLogin} />
    </section>
  )
}

export default Login;