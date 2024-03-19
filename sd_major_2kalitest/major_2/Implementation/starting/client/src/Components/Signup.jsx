import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [accountExists, setAccountExists] = useState(false); // New state for account existence
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setShowAlert(true);
      return;
    }
    Axios.post('http://localhost:3000/auth/signup', {
      username,
      email,
      password
    }).then(response => {
      if (response.data.status) {
        navigate('/login');
      }
    }).catch(err => {
      console.log(err);
      if (err.response && err.response.status === 409) { // Assuming 409 status code indicates account already exists
        setAccountExists(true);
      }
    });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="sign-up-container">
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username"> Username:</label>
        <input type="text" placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email"> Email:</label>
        <input type="email" autoComplete='off' placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password"> Password:</label>
        <input type="password" placeholder='******'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' className="blue-button">Sign Up</button>
        <div className="button-group">
  <div style={{ marginBottom: '10px' }}>
    <h4>
      Have an account?
    </h4>
  </div>
  <button type="button" className="login-button" onClick={handleLogin}>
    Login
  </button>
</div>

      </form>

      {showAlert && (
        <div className="alert">
          Please fill in all fields.
        </div>
      )}

      {accountExists && (
        <div className="alert">
          Account already exists.
        </div>
      )}
    </div>
  );
}

export default Signup;
