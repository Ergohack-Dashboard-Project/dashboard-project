import Header from '@components/Header';
import BottomNav from '@components/navigation/BottomNav';
import { useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import makeStyledScrollbar from 'styles/makeStyledScrollbar';

const Root = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  overflowX: 'hidden',
  overflowY: 'scroll',
  [theme.breakpoints.up('lg')]: {
    ...makeStyledScrollbar(theme),
  },
}));

const childrenWrapper = {
  minHeight: '20vh',
  marginBottom: 6,
};

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Root>
      <Header />
      <Box sx={childrenWrapper}>{children}</Box>
      {isMobile && <BottomNav />}
    </Root>
  );
};

export default Layout;
