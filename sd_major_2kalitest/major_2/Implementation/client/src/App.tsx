import  { useEffect, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '@/scenes/navbar';
import Dashboard from './scenes/dashboard';
import Exchange from "@/scenes/exchange"
import Handbook from './scenes/Handbook';
import About from './scenes/About';
import Predictions from '@/scenes/predictions';
import MainComponent from '@/scenes/taxcalculator';
import InvoiceSystem from '@/scenes/invoice';
import Expense from './scenes/Expense';


import { themeSettings } from './theme';
import './index.css';


const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('current_theme') || 'light');


  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);


  const muiTheme = useMemo(() => createTheme(themeSettings), [theme]);


  return (
    <div className={`container ${theme}`}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predictions" element={<Predictions />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/handbook" element={<Handbook />} />
            <Route path="/exchange" element={<Exchange/>} />
            <Route path="/expense" element={<Expense/>} />
            <Route path="/taxcalculator" element={<MainComponent/>} />
            <Route path="/invoice" element={<InvoiceSystem/>} />
            
            

            

            
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};


export default App;
