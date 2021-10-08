import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import { wrapper } from '../redux/store';

import '/styles/globals.css';
import theme from '../styles/theme';
import Layout from '@components/layout/Layout';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SAVE_ACCESS_TOKEN_IN_STORE } from 'redux/auth';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Get user from Redux Store
  const user = useSelector((state) => state.auth.user);
  const authToken = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();

  // Check for user auth token here, on mount.
  useEffect(() => {
    console.log('user:', user);
    console.log('window:', typeof window !== undefined);

    // Get user token
    const token = localStorage.getItem('access-token');

    // Dispatch user token if available
    token && dispatch(SAVE_ACCESS_TOKEN_IN_STORE, { data: token });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>ErgoPad</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
