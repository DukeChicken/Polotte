import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme } from '../mui/theme';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Head>
        <title>Polotte</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
