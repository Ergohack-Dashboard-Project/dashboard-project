import { useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material';
import MuiNextLink from './MuiNextLink';
import ErgoDashLogo from './stylistic/ErgoDash';

const Navbar = ({ navLinks }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Toolbar
      component='nav'
      // REMOVE THIS COMMENT IF YOU PLACE LOGO
      sx={{
        paddingLeft: 0,
        marginLeft: 0,
      }}
    >
      <Stack direction='row' spacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
        {/*  TEMP LOGO THAT I DIDN"T END UP LIKING. (AQUISTOY) */}
        <MuiNextLink href={'/'} variant='button' underline='none'>
          <ErgoDashLogo />
        </MuiNextLink>

        {!isMobile && (
          <>
            {navLinks.map(({ title, path }, i) => (
              <MuiNextLink
                key={`${title}${i}`}
                href={path}
                variant='button'
                sx={{
                  color: 'rgb(215, 215, 218)',
                  '&:hover': {
                    color: 'white',
                  },
                }}
                underline='none'
              >
                {title}
              </MuiNextLink>
            ))}
          </>
        )}
      </Stack>
    </Toolbar>
  );
};

export default Navbar;
