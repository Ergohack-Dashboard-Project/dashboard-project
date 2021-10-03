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
  },
});

theme = responsiveFontSizes(theme);

export default theme;