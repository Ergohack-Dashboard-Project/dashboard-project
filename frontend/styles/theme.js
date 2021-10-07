import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a theme instance.
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(57, 186, 181)',
    },
    secondary: {
      main: 'rgb(162, 162, 168)',
    },
    background: {
      default: 'rgb( 29, 29, 32 )',
    },
    text: {
      primary: 'rgb(244, 244, 245)',
      secondary: 'rgb(162, 162, 168)',
    },
    action: {
      hover: '#ffffff',

      light: {},
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: {
      fontWeight: '800',
    },
  },
});

theme = responsiveFontSizes(theme);

theme.typography.h1 = {
  fontSize: '5.35rem',
  lineHeight: '1.167',
  '@media (max-width:880px)': {
    fontSize: '4.71rem',
  },
  '@media (max-width:800px)': {
    fontSize: '3.9rem',
  },
  '@media (max-width:680px)': {
    fontSize: '3.5rem',
  },
};

export default theme;
