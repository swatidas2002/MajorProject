import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';
import './Navbar.css'

const Navbar = ({ theme, setTheme }) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState('dashboard');

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const handleLogout = () => {
    // Here, you can implement your logout logic, such as clearing session, removing tokens, etc.
    // After the logout logic is executed, you can navigate to a specific page.
    // For example, if you're using React Router:
    window.location.href = 'http://localhost:5173/'; // Replace '/logout' with the actual URL you want to navigate to after logout.
  };

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
    {/* LEFT SIDE */}
    <FlexBetween gap="0.75rem" alignItems="center">
      {/* Add marginLeft to move the icon to the right */}
      <AccountBalanceIcon sx={{ fontSize: '25px', marginLeft: '5px' }} />
      <Typography variant="h4" fontSize="18px">
        FINANCE FRIEND
      </Typography>
    </FlexBetween>
    {/* ... Other content on the right side ... */}
  

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        
      <Box sx={{ "&:hover": { color: (palette.primary as any)[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            DASHBOARD
          </Link>
        </Box>


        <Box sx={{ "&:hover": { color: (palette.primary as any)[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            PREDICTIONS
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: (palette.primary as any)[100] } }}>
          <Link
            to="/expense"
            onClick={() => setSelected("expense")}
            style={{
              color: selected === "expense" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            EXPENSE
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: (palette.primary as any)[100] } }}>
          <Link
            to="/taxcalculator"
            onClick={() => setSelected("taxcalculator")}
            style={{
              color: selected === "taxcalculator" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            TAX 
          </Link>
        </Box>
        
        <Box sx={{ "&:hover": { color: (palette.primary as any)[100] } }}>
          <Link
            to="/invoice"
            onClick={() => setSelected("invoice")}
            style={{
              color: selected === "invoice" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            INVOICE
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: (palette.primary as any)[100] } }}>
          <Link
            to="/exchange"
            onClick={() => setSelected("exchange")}
            style={{
              color: selected === "exchange" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            EXCHANGE
          </Link>
        </Box>


        <Box sx={{ "&:hover": { color: (palette.primary as any)[100] } }}>
          <Link
            to="/handbook"
            onClick={() => setSelected("handbook")}
            style={{
              color: selected === "handbook" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            HANDBOOK
          </Link>
        </Box>


        <Box sx={{ "&:hover": { color: (palette.primary as any)[100] } }}>
          <Link
            to="/about"
            onClick={() => setSelected("about")}
            style={{
              color: selected === "about" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            ABOUT
          </Link>
        </Box>


   <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: palette.grey[700],
              cursor: 'pointer',
              textDecoration: 'inherit',
              outline: 'none',
              fontSize: 'inherit',
            }}
          >
            LOGOUT
          </button>
        </Box>

        {/* Toggle Button */}

        
        <img
          onClick={() => {
            toggle_mode();
          }}
          src={theme === 'light' ? toggle_light : toggle_dark}
          className="toggle-icon"
          alt="Toggle"
        />

        
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
