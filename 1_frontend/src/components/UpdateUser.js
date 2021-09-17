import React, { useState, useContext } from 'react';
import { UsersContext } from '../App';
import axios from 'axios';

// Styling
import './styles/UpdateUser.css';

const UpdateUser = () => {
  // Hooks
  // -- state
  // --- local
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [select, setSelect] = useState('Select Here');
  const [success, setSuccess] = useState('');

  // --- global
  const { state, dispatch } = useContext(UsersContext);

  // Custom Functions
  const updateUser = (e) => {
    e.preventDefault();

    const updatedUser = {
      name: newName,
      age: newAge,
      email: newEmail,
      password: newPassword,
    };

    axios
      .put(`http://localhost:5000/api/user/${userId}`, updatedUser)
      .then((response) => {
        setNewName('');
        setNewAge(0);
        setNewEmail('');
        setNewPassword('');
        setSelect('Select Here');
        setSuccess('User updated!');
        setTimeout(() => {
          setSuccess('');
        }, 3000);

        dispatch({ type: 'UPDATEUSERS', payload: response.data.newData });
      });
  };

  const changeUser = (e) => {
    const user = state.users.filter((item) => {
      return item._id === e.target.value;
    });

    setNewName(user[0].name);
    setNewAge(user[0].age);
    setNewEmail(user[0].email);
    setNewPassword(user[0].password);
    setUserId(e.target.value);

    setSelect(user[0].name);
  };

  return (
    <section id='updateUser'>
      <h4>UPDATE USER</h4>
      <form id='updateUserForm' onSubmit={updateUser}>
        <select id='selectUser' onChange={changeUser}>
          <option defaultValue={select} hidden>
            {select}
          </option>
          {state.users.map((item) => (
            <option key={Math.random()} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <div className='formDiv'>
          <label htmlFor='userName'>Name</label>
          <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>

        <div className='formDiv'>
          <label htmlFor='userAge'>Age</label>
          <input
            type='number'
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
            required
          />
        </div>

        <div className='formDiv'>
          <label htmlFor='userEmail'>Email</label>
          <input
            type='email'
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>

        <div className='formDiv'>
          <label htmlFor='userPassword'>Password</label>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <input type='submit' value='UPDATE USER' />
        <p id='successMessage'>{success}</p>
      </form>
    </section>
  );
};

export default UpdateUser;
