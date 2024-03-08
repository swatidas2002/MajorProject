// muiTheme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Default mode is light
    primary: {
      main: '#1976d2', // Example primary color
    },
    background: {
      light: '#FFFFFF', // Light mode background color
      dark: '#212121', // Dark mode background color
    },
    // Add other palette colors as needed
  },
});

export default theme;
