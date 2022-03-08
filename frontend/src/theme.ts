import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFFFFF',
      contrastText: '#954A05',
    },
    secondary: {
      main: '#755846',
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
      paper: '#FFEDE2',
    },
    text: {
      primary: '#201A17',
      secondary: '#E5BFA8',
      disabled: '#84746A',
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
