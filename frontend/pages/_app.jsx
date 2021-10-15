import Head from 'next/head';
import { ThemeProvider, StylesProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';

import '/styles/globals.css';
import theme from '../styles/theme';
import Layout from '@components/layout/Layout';
// import { useEffect } from 'react';
// import { useSelector, useStore } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { SAVE_ACCESS_TOKEN_IN_STORE } from 'redux/auth';
import { ProvideAuth, useAuth } from 'src/auth';
import { SnackbarProvider } from 'notistack';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Get user from Redux Store
  // const user = useSelector((state) => state.auth.user);
  // const authToken = useSelector((state) => state.accessToken);
  // const dispatch = useDispatch();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>ErgoPad</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      {/* MUI Theme Provider */}
      <ThemeProvider theme={theme}>
        
          <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} maxSnack={3} dense>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ProvideAuth>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ProvideAuth>
          </SnackbarProvider>
        
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
// export default wrapper.withRedux(MyApp);
