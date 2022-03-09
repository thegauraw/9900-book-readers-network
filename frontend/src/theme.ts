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
      paper: '#B6C7DD',
    },
    text: {
      primary: '#5D5E61',
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
  },
});

export default theme;