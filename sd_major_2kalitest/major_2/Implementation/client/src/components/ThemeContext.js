// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      <Toaster 
          position="top-center"
         reverseOrder={true}
      />
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
