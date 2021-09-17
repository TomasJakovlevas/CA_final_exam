import React from 'react';

// Styling
import './styles/Button.css';

const Button = ({ text, action }) => {
  return <button onClick={action}>{text}</button>;
};

export default Button;
