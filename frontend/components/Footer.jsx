import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@components/MuiNextLink';
import { List, ListItem, Box } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundContainer = styled('div')(({ theme }) => ({
  zIndex: '-100',
  
  pointerEvents: 'none'
}));

const BackgroundSVG = styled('svg')(({ theme }) => ({
  width: '800px',
  height: '264px',
  position: 'absolute',
  bottom: '0',
  left: '-400px',
}));

const Footer = () => {
  return (
    <>
      {/* Footer illustration */}
      <BackgroundContainer aria-hidden="true" variant='inherit'>
          <BackgroundSVG fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.4">
              <circle cx="400" cy="400" r="400" fill="url(#footerglow_paint0_radial)" fillOpacity=".4" />
              <defs>
                  <radialGradient id="footerglow_paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 0 400) scale(315.089)">
                      <stop stopColor="#3ABAB4" />
                      <stop offset="1" stopColor="#3ABAB4" stopOpacity=".01" />
                  </radialGradient>
              </defs>
          </BackgroundSVG>
      </BackgroundContainer>

      <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={12} md={4}>
          
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography variant='inherit' sx={titleStyles}>COMPANY</Typography>
          <List>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                About
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Press
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Legal
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Contact
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography variant='inherit' sx={titleStyles}>SUPPORT</Typography>
          <List>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Documentation
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Tutorials & Guides
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                FAQ
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Open Source
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography variant='inherit' sx={titleStyles}>SOCIAL</Typography>
          <List>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Telegram
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Announcements
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Discord
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Twitter
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Medium
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography variant='inherit' sx={titleStyles}>ERGO RESOURCES</Typography>
          <List>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Official Website
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                ErgoDex
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                Ergo Manifesto
              </Link>
            </ListItem>
            <ListItem disableGutters sx={listItemStyles}>
              <Link activeClassName='active' href='/' sx={linkStyles}>
                AppKit
              </Link>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={bottomStyles}>
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant='inherit' sx={textStyles}>© 2021 ErgoPad. All rights reserved.</Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'center' } }}>
          <Link activeClassName='active' href='/' sx={linkStyles}>
            Terms
          </Link>{' '}
          ·{' '}
          <Link activeClassName='active' href='/' sx={linkStyles}>
            Privacy Policy
          </Link>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <Typography variant='inherit' sx={textStyles}>Social</Typography>
        </Grid>
      </Grid>
    </>
  );
};

const titleStyles = {
  '& span': {
    color: (theme) => theme.palette.primary.primary,
  },
  fontWeight: 'normal',
  fontSize: 14,
};

const textStyles = {
  color: (theme) => theme.palette.text.secondary,
  fontSize: 14,
};

const linkStyles = {
  color: (theme) => theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
  fontSize: 14,
};

const listItemStyles = {
  lineHeight: 0.7,
  fontSize: 14,
};

const bottomStyles = {
  pt: 4,
  // fontSize: 14,
  display: 'flex',
  justifyContent: {
    xs: 'center',
    md: 'space-between',
  },
};

const backgroundStyles = {
  ml: 24,
}

export default Footer;
