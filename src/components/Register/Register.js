import React from 'react';
import './Register.css';
import Form from '../Form/Form';


function Register({ handleRegister, errorText }) {
  return (
    <section className='register'>
      <Form handleRegister={handleRegister} errorText={errorText} />

    </section>
  )
}

export default Register;