import { useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { useRouter } from 'next/router';
// import { AnimatePresence, motion } from 'framer-motion';

import Header from '@components/Header';
import BottomNav from '@components/navigation/BottomNav';
import Aurora from '@components/stylistic/Aurora';
import makeStyledScrollbar from 'styles/makeStyledScrollbar';
// import pageTransitions from './pageTransitions';
import Fade from '@mui/material/Fade';

const Root = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100vw',
/*   overflowX: 'hidden',
  overflowY: 'scroll',
  [theme.breakpoints.up('lg')]: {
    ...makeStyledScrollbar(theme),
  }, */
}));

const pageWrapper = {
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

      {/* <AnimatePresence exitBeforeEnter>
        <Aurora key={router.route} />
       </AnimatePresence>*/}

      {/* <AnimatePresence exitBeforeEnter>*/}
        {/* Page transition animations 
        <Box
          component={motion.div}
          key={router.route}
          variants={pageTransitions}
          position='absolute'
          initial='hidden'
          animate='visible'
          exit='hidden'
          sx={pageWrapper}
        >*/}
      <Box position='relative'>
        <Aurora />
        <Box 
          poition='absolute'
          sx={pageWrapper}
        >{children}
{/*           <Fade appear='true' in='true' key={router.route}>
          {children}
          </Fade> */}
        </Box>
      </Box>
      {/* </AnimatePresence>*/}
      {isMobile && <BottomNav />}
    </Root>
  );
};

export default Layout;
