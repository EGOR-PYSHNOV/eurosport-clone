import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
import '../styles/globals.scss';
import { ApolloProvider, ApolloClient, InMemoryCache, from } from '@apollo/client';
import { Layout } from '../components/Layout';
import { GET_ALL_CATEGORIES_LINK } from '../graphql/queries/categories';
import { ICategory } from '../types/category';
import { authLink } from '../utils/authLink';
import { checkAuth } from '../utils/checkAuth';
import { roles } from '../types/roles';
import { createUploadLink } from 'apollo-upload-client';

export const SERVER_URL = 'https://localhost:5000';

const uploadLink: any = createUploadLink({
  uri: `${SERVER_URL}/graphql`,
});

//@ts-ignore
export const client = new ApolloClient({
  uri: `${SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
  link: from([authLink, uploadLink]),
  connectToDevTools: true,
  ssrMode: typeof window === 'undefined',
});

interface IMyApp extends AppProps {
  categoriesLinks: ICategory[];
}

export const Context = React.createContext<any>(null);

function MyApp({ Component, pageProps, categoriesLinks }: IMyApp) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Eurosport-clone</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <Context.Provider value={categoriesLinks}>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </Context.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }: any) => {
  const userRole: string = await checkAuth(ctx);
  const adminRoutes = ctx.pathname.includes('admin');

  if (!userRole) {
    if (ctx.pathname === '/my-account' || adminRoutes) {
      ctx.res.writeHead(302, { Location: '/auth' }).end();
    }
  } else {
    if (adminRoutes) {
      if (userRole !== roles.ADMIN && userRole !== roles.EDITOR) {
        ctx.res.writeHead(302, { Location: '/' }).end();
      }
    }
  }

  const { data } = await client.query({ query: GET_ALL_CATEGORIES_LINK });

  return { categoriesLinks: data.getAllCategories };
};

export default MyApp;
