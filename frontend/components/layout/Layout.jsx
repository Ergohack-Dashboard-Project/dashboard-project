import Header from '@components/Header';
import BottomNav from '@components/navigation/BottomNav';
import { useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import makeStyledScrollbar from 'styles/makeStyledScrollbar';
import pageTransitions from './pageTransitions';

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
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Root>
      <Header />
      <AnimatePresence exitBeforeEnter>
        {/* Page transition animations */}
        <Box
          component={motion.div}
          key={router.route}
          variants={pageTransitions}
          initial='hidden'
          animate='visible'
          exit='hidden'
          sx={childrenWrapper}
        >
          {children}
        </Box>
      </AnimatePresence>
      {isMobile && <BottomNav />}
    </Root>
  );
};

export default Layout;
