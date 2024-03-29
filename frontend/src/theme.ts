import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B6C7DD',
      contrastText: '#000',
    },
    secondary: {
      main: '#526070',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#BA1B1B',
    },
    success: {
      main: '#606134',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000',
      secondary: '#5D5E61',
      disabled: '#5D5E61',
    },
    action: {
      active: '#000',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Open Sans'].join(','),
    button: {
      textTransform: 'capitalize',
      fontWeight: 600,
    },
    h2: {
      fontSize: '3.50rem',
      fontWeight: 800,
    },
    h3: {
      fontSize: '1.1rem',
      fontWeight: 550,
    },
    h4: {
      fontSize: '0.95rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '0.85rem',
      fontWeight: 500,
      color: '#526070',
    },
    subtitle2: {
      fontSize: '0.8rem',
      fontWeight: 500,
      color: '#526070',
    },
  },
});

export default theme;
