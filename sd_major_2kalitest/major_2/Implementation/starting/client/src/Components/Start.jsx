import React from 'react';
import { Link } from 'react-router-dom';
import './Start.css'; 

const Start = () => {
  return (
    <div>
      <h1>FINANCE FRIEND</h1>
      <p>Your pathway to visualize your data.</p>
      <div className="get-started-container"> {/* Add container for buttons */}
        <button><Link to="/signup" className="get-started">SIGN UP</Link></button>
        <button><Link to="/login" className="get-started">LOGIN</Link></button>
      </div>
    </div>
  );
}

export default Start;
