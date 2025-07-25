// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode globally
    background: {
      default: '#181A1B',    // Main background: very dark grey
      paper: '#222426',      // Surfaces: slightly lighter dark
      appBar: '#2D2F31',     // AppBar/TopBar: dark with white/grey contrast
    },
    primary: {
      main: '#23272A',       // Button default: deep dark
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#C0C0C0',       // For accents or less important buttons: light grey
      contrastText: '#181A1B'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#C0C0C0'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#23272A', // Default button
          color: '#FFF',
          '&:hover': {
            backgroundColor: '#424549', // Grey hover effect
          },
        },
        outlined: {
          borderColor: '#C0C0C0',
          color: '#C0C0C0',
          '&:hover': {
            borderColor: '#FFF',
            backgroundColor: '#23272A',
          },
        },
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #222426 0%, #2D2F31 100%)',
          color: '#FFF',
        },
      }
    },
  },
});

export default theme;