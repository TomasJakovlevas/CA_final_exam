import React, { useState, useContext } from 'react';
import { UsersContext } from '../App';
import axios from 'axios';

// Style
import './styles/CreateUser.css';

const CreateUser = () => {
  // Hooks
  // -- state
  // ---local
  // ---- create user form
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // --- global
  const { state, dispatch } = useContext(UsersContext);

  // Custom Functions

  const createUser = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setPassword('');
      setPasswordConfirm('');
      setError('Slaptažodžiai turi sutapti');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    const user = {
      name,
      age,
      email,
      password,
    };

    axios
      .post('http://localhost:5000/api/users/signup/', user)
      .then((response) => {
        if (response.data.status === 'Error') {
          setError('El. paštas jau užimtas');

          setTimeout(() => {
            setError('');
          }, 3000);

          setEmail('');
          setPassword('');
          setPasswordConfirm('');
        } else if (response.data.status === 'Success') {
          setSuccess('Vartotojas Sukurtas!');
          setTimeout(() => {
            setSuccess('');
          }, 3000);

          setName('');
          setAge('');
          setEmail('');
          setPassword('');
          setPasswordConfirm('');

          const newState = state.users;
          newState.push({ ...user, _id: response.data.userID });

          dispatch({ type: 'UPDATEUSERS', payload: newState });
        }
      });
  };

  return (
    <section id='createUser'>
      <h1>ADMIN</h1>
      <h3>Sukurti vartotoją</h3>
      <form id='createUserForm' onSubmit={createUser}>
        <div className='inputDiv'>
          <label htmlFor='userName'>Vardas</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='inputDiv'>
          <label htmlFor='userAge'>Amžius</label>
          <input
            type='number'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className='inputDiv'>
          <label htmlFor='userEmail'>El. paštas</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='inputDiv'>
          <label htmlFor='userPassword'>Slaptažodis</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='inputDiv'>
          <label htmlFor='userPasswordConfirm'>Pakartokite slaptažodį</label>
          <input
            type='password'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>

        <input type='submit' value='SUKURTI VARTOTOJĄ' />
      </form>
      <p className='errorMessage'>{error}</p>
      <p className='successMessage'>{success}</p>
    </section>
  );
};

export default CreateUser;
