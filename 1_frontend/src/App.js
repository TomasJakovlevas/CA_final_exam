import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

// Styling
import './App.css';

// Components
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import UpdateUser from './components/UpdateUser';

// Context
export const UsersContext = React.createContext();

// State Managment
const initialState = { users: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATEUSERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

function App() {
  // Hooks
  // -- state
  const [state, dispatch] = useReducer(reducer, initialState);

  // -- side Effect
  useEffect(() => {
    // Get ALL USERS
    axios.get('http://localhost:5000/api/users/').then((response) => {
      dispatch({ type: 'UPDATEUSERS', payload: response.data });
    });
  }, []);

  return (
    <>
      <UsersContext.Provider value={{ state, dispatch }}>
        <CreateUser />
        <UpdateUser />
        <Users />
      </UsersContext.Provider>
    </>
  );
}

export default App;
