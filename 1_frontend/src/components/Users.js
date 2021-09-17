import React, { useContext, useState } from 'react';
import { UsersContext } from '../App';
import axios from 'axios';

// Style
import './styles/Users.css';
import Button from './Button';

const Users = () => {
  // Hooks
  // -- state
  // ---- local
  const [errorMessage, seterrorMessage] = useState('');

  // ---- global
  const { state, dispatch } = useContext(UsersContext);

  // Custom Functions
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/user/${id}`).then((response) => {
      if (response.data.status === 'Success') {
        const newState = state.users.filter((item) => {
          return item._id !== id;
        });

        dispatch({ type: 'UPDATEUSERS', payload: newState });
      } else if (response.data.status === 'Error') {
        seterrorMessage(
          'Sorry, we had some troubles deleting user. Please try again later'
        );
      }
    });
  };

  return (
    <section id='users'>
      <p id='errorMessage'>{errorMessage}</p>
      {state.users ? (
        state.users.map((item) => (
          <div key={Math.random()} className='userCard'>
            <h3>{item.name}</h3>
            <span>{item.age}</span>
            <p>{item.email}</p>
            <p>{item.password}</p>
            <Button text='IŠTRINTI' action={() => handleDelete(item._id)} />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default Users;
