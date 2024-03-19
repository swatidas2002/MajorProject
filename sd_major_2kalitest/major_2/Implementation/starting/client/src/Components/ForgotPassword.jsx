import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../App.css';
import Axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/forgot-password', {
      email, 
    }).then(response => {
      if (response.data.status) {
        alert("Check your email for reset password link");
        navigate('/login');
      } else {
        alert("Email address not found. Please enter a valid email address.");
      }
    }).catch(err => {
      console.log(err);
      alert("An error occurred. Please try again later.");
    });
  };

  return (
    <div className="sign-up-container">
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <label htmlFor="email"> Email:</label>
        <input type="email" autoComplete='off' placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />      
        <button type='submit' className="blue-button">Send</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
