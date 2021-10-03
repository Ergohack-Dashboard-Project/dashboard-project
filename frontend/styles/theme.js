import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { rgb } from "color-convert";

// Create a theme instance.
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
        light: 'rgb(29, 29, 32)',
        main: 'rgb(244, 244, 245)',
    },
    secondary: {
        light: 'rgb(82, 82, 90)',
        main: 'rgb(162, 162, 168)',
    },
  },
  typography: {
    fontFamily: [
        'Inter', 
        'sans-serif',
    ].join(','),
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