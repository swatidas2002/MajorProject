import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmptyFieldAlert, setShowEmptyFieldAlert] = useState(false);
  const [showWrongCredentialsAlert, setShowWrongCredentialsAlert] = useState(false);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setShowEmptyFieldAlert(true);
      return;
    }
    Axios.post('http://localhost:3000/auth/login', {
      email,
      password
    }).then(response => {
      if (response.data.status) {
        window.location.href = 'http://localhost:5174/';
      } else {
        setShowWrongCredentialsAlert(true);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="sign-up-container">
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email"> Email:</label>
        <input type="email" autoComplete='off' placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password"> Password:</label>
        <input type="password" placeholder='******'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-group">
          <button type='submit' className="blue-button">Login</button>
          <button type="button" className="blue-button" onClick={handleForgotPassword}>Forgot Password</button>
        </div>
        <div className="button-group">
  <div style={{ marginBottom: '10px' }}>
    <h4>
      Don't have an account?
    </h4>
  </div>
  <button type="button" className="blue-button" onClick={handleSignUp}>
    Sign Up
  </button>
</div>

      </form>

      {showEmptyFieldAlert && (
        <div className="alert">
          Please fill in all fields.
        </div>
      )}

      {showWrongCredentialsAlert && (
        <div className="alert">
          Wrong credentials. Please try again.
        </div>
      )}
    </div>
  );
}

export default Login;
