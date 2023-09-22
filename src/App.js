import React, { useState, useEffect } from 'react';

import './App.css';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';

function App() {
  // State to keep track of whether the user has registered before
  const [isRegistered, setIsRegistered] = useState(false);

  // useEffect hook to check if the user has registered before (using local storage)
  useEffect(() => {
    const isUserRegistered = localStorage.getItem('isRegistered');
    setIsRegistered(!!isUserRegistered); // Convert to boolean
  }, []);

  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Welcome to My Internet Hotspot'),
    isRegistered ? React.createElement(Login, null) : React.createElement(Registration, null)
  );
}

export default App;
