import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@components/MuiNextLink';
import { List, ListItem } from '@mui/material';
import { styled } from '@mui/system';

const Footer = () => {
  return (
    <>
      <Grid container spacing={1} sx={{ pt: 10 }}>
          <Grid item xs={12} md={4}>

          </Grid>
          <Grid item xs={6} md={2}>
              <Typography sx={titleStyles}>COMPANY</Typography>
              <List>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>About</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Press</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Legal</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Contact</Link></ListItem>
              </List>
          </Grid>
          <Grid item xs={6} md={2}>
              <Typography sx={titleStyles}>SUPPORT</Typography>
              <List>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Documentation</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Tutorials & Guides</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>FAQ</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Open Source</Link></ListItem>
              </List>
          </Grid>
          <Grid item xs={6} md={2}>
              <Typography sx={titleStyles}>SOCIAL</Typography>
              <List>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Telegram</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Announcements</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Discord</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Twitter</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Medium</Link></ListItem>
              </List>
          </Grid>
          <Grid item xs={6} md={2}>
              <Typography sx={titleStyles}>ERGO RESOURCES</Typography>
              <List>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Official Website</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>ErgoDex</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>Ergo Manifesto</Link></ListItem>
                <ListItem disableGutters sx={listItemStyles}><Link activeClassName='active' href='/' sx={linkStyles}>AppKit</Link></ListItem>
              </List>
          </Grid>
      </Grid>
      <Grid container spacing={1} sx={bottomStyles}>
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' }}}>
            <Typography sx={textStyles}>© 2021 ErgoPad. All rights reserved.</Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'center' }}}>
        <Link activeClassName='active' href='/' sx={linkStyles}>Terms</Link> · <Link activeClassName='active' href='/' sx={linkStyles}>Privacy Policy</Link>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' }}}>
            <Typography sx={textStyles}>Social</Typography>
        </Grid>
      </Grid></>
  );
};

const titleStyles = {
    '& span': {
      color: (theme) => theme.palette.primary.main,
    },
    fontWeight: 'normal',
    fontSize: '0.92rem',
  };

const textStyles = {
    color: (theme) => theme.palette.text.secondary,
    fontSize: '0.92rem',
}

const linkStyles = {
    color: (theme) => theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
    fontSize: '0.92rem',
}

const listItemStyles = {
    lineHeight: '0.51rem',
    fontSize: '0.92rem',
}

const bottomStyles = {
    pt: 2, 
    display: 'flex',
    justifyContent: {
        xs: 'center',
        md: 'space-between',
    }
}

export default Footer;
