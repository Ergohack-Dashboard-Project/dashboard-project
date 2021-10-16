import { AppBar, Container, Toolbar, flexbox, useTheme, useMediaQuery, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Home from '@mui/icons-material/Home';
import MuiNextLink from '@components/MuiNextLink';
import Navbar from './Navbar';
import SideDrawer from './SideDrawer';
import HideOnScroll from './HideOnScroll';
import Fab from '@mui/material/Fab';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import BackToTop from './BackToTop';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export const navLinks = [
  { title: `Home`, path: `/` },
  { title: `About`, path: `/about` },
  { title: `Token Info`, path: `/token-info` },
  { title: `Staking`, path: `/staking` },
  { title: `Dashboard`, path: `/dashboard` },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
        <AppBar position='static' color='transparent' sx={{ boxShadow: 'none', height: '5rem', p: 0 }}>
          <Toolbar disableGutters={true}>
              <MuiNextLink activeClassName='active' href='/'>
                <IconButton>
                    <svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="26%" y1="100%" x2="100%" y2="100%" id="logo_a"><stop stopColor="#3ABAB4" offset="0%"></stop><stop stopColor="#7F9CF5" offset="100%"></stop></linearGradient><linearGradient x1="26%" y1="100%" x2="100%" y2="100%" id="logo_b"><stop stopColor="#3ABAB4" offset="0%"></stop><stop stopColor="#3ABAB4" stopOpacity="0" offset="100%"></stop></linearGradient></defs><path d="M32 16h-8a8 8 0 10-16 0H0C0 7.163 7.163 0 16 0s16 7.163 16 16z" fill="url(#logo_a)"></path><path d="M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16h8a8 8 0 1016 0h8z" fill="url(#logo_b)"></path></svg>
                </IconButton>
              </MuiNextLink>

              <Navbar navLinks={navLinks} />
              {!isMobile && <SideDrawer navLinks={navLinks} />}
          </Toolbar>
        </AppBar>
    </>
  );
};

export default Header;
