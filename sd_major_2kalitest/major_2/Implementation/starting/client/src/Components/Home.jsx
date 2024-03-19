import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>Home</p>
      <button><Link to="/dashboard">Dashboard</Link></button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
