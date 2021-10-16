import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { text } from 'dom-helpers';

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
      paper: 'rgb( 29, 29, 32 )',
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
    fontFamily: ['"Inter"', 'sans-serif'].join(','),
    }
  });



theme.typography.h1 = {
  fontSize: '5.35rem',
  lineHeight: '1.167',
  color: theme.palette.text.primary,
  fontFamily: "'Red Hat Display', sans-serif",
  fontWeight: '800',
  letterSpacing: '-0.02em',
  marginBottom: '1rem',
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
theme.typography.h2 = {
  color: theme.palette.text.primary,
  fontFamily: "'Red Hat Display', sans-serif",
  fontWeight: '800',
  fontSize: '3.5rem',
  marginBottom: '1rem',
  '@media (max-width:880px)': {
    fontSize: '2.63rem',
  },
  lineHeight: '1.18',
  letterSpacing: '-0.02em',
}
theme.typography.h3 = {
  color: theme.palette.text.primary,
  fontFamily: "'Red Hat Display', sans-serif",
  fontWeight: '800',
}
theme.typography.h4 = {
  color: theme.palette.text.primary,
  fontFamily: "'Red Hat Display', sans-serif",
  fontWeight: '800',
}
theme.typography.h5 = {
  color: theme.palette.text.primary,
  fontFamily: "'Red Hat Display', sans-serif",
  fontWeight: '800',
}
theme.typography.h6 = {
  color: theme.palette.text.primary,
  fontFamily: "'Red Hat Display', sans-serif",
  fontWeight: '800',
}

theme.typography.subtitle1 = {
  fontSize: '1.25rem',
  lineHeight: '1.5',
  marginBottom: '1rem',
  fontWeight: '400',
  fontFamily: "'Inter', sans-serif",
  color: theme.palette.text.secondary
}

export default theme;
