import React from 'react';
import './Register.css';
import Form from '../Form/Form';


function Register({ onRegister }) {
  return (
    <section className='register'>
      <Form onRegister={onRegister} />
  
    </section>
  )
}

export default Register;