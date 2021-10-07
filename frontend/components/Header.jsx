import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
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
      <HideOnScroll>
        <AppBar position='fixed' color='transparent' sx={{ boxShadow: 'none' }}>
          <Toolbar>
            <Container
              maxWidth='lg'
              sx={{ display: `flex`, justifyContent: `space-between` }}
            >
              <IconButton edge='start' aria-label='home'>
                <MuiNextLink activeClassName='active' href='/'>
                  <Home
                    sx={{
                      color: (theme) => theme.palette.common.white,
                    }}
                    fontSize='large'
                  />
                </MuiNextLink>
              </IconButton>
              <Navbar navLinks={navLinks} />
              {!isMobile && <SideDrawer navLinks={navLinks} />}
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Offset id='back-to-top-anchor' />
      <BackToTop>
        <Fab color='secondary' size='large' aria-label='back to top'>
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
};

export default Header;
