import { useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import Header from '@components/Header';
import BottomNav from '@components/navigation/BottomNav';
import Aurora from '@components/stylistic/Aurora';
import makeStyledScrollbar from 'styles/makeStyledScrollbar';
import pageTransitions from './pageTransitions';
import Fade from '@mui/material/Fade';

const Root = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw',
  overflowX: 'hidden',
  overflowY: 'hidden',
}));

// const pageWrapper = {
//   minHeight: '20vh',
//   marginBottom: 6,
//   width: '100vw',
//   height: '100vh',
//   overflowY: 'scroll',
//   overflowX: 'hidden',
//   [theme.breakpoints.up('lg')]: {
//     ...makeStyledScrollbar(theme),
//   },
// };

const PageWrapper = styled('div')(({ theme }) => ({
  minHeight: '20vh',
  marginBottom: 6,
  width: '100vw',
  height: '100vh',
  overflowY: 'scroll',
  overflowX: 'hidden',
  [theme.breakpoints.up('lg')]: {
    ...makeStyledScrollbar(theme),
  },
}));

const Layout = ({ children }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Root>
      <Header />

      <AnimatePresence exitBeforeEnter>
        <Aurora key={router.route} />
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        {/* Page transition animations  */}
        <PageWrapper
          as={motion.div}
          key={router.route}
          variants={pageTransitions}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          {children}
        </PageWrapper>
      </AnimatePresence>
      {isMobile && <BottomNav />}
    </Root>
  );
};

export default Layout;
