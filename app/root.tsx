import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import * as dotenv from 'dotenv';
import { useTranslation } from 'react-i18next';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useChangeLanguage } from 'remix-i18next';
import { useTheme } from 'styled-components';
import Box from '@components/core/Box';
import AppLoader from '@components/layout/AppLoader';
import Header from '@components/layout/Header';
import { initApi } from '@config/axiosConfig';
import queryClient from '@config/reactQueryConfig';
import remixI18n from '@i18n/i18n.server';

import globalFontsUrl from '@theme/global.css';
import { languages } from '@utils/date';

export const handle = {
  i18n: ['common'],
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    dotenv.config();

    const locale = await remixI18n.getLocale(request);
    const t = await remixI18n.getFixedT(locale, 'common');

    const title = t('common.meta.home.title');
    const description = t('common.meta.home.description');
    const apiUrl = process.env.API_URL;

    return json({ locale, title, description, apiUrl });
  } catch (error) {
    console.error(`[ERROR] ${error}`);
    throw error;
  }
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.error('[ERROR]', error);
  return null;
};

export const meta: MetaFunction = ({ data }) => ({
  charset: 'utf-8',
  title: data.title,
  description: data.description,
  viewport: 'width=device-width,initial-scale=1',
  themeColor: 'primary',
});

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css',
    },
    {
      rel: 'stylesheet',
      href: globalFontsUrl,
    },
  ];
}

type DataProps = {
  locale: string;
  apiUrl: string;
};

const App = () => {
  const { i18n } = useTranslation(['common']);
  const { locale, apiUrl } = useLoaderData<DataProps>();
  const theme = useTheme();

  initApi(apiUrl, languages[locale]);

  useChangeLanguage(locale);

  return (
    <html lang={i18n.language} style={{ scrollBehavior: 'auto' }}>
      <head>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body style={{ backgroundColor: theme.colors.white, overflowX: 'hidden', margin: 0 }}>
        <AppLoader>
          <Box display={{ _: 'none', lg: 'block' }}>
            <Outlet />
          </Box>

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <ReactQueryDevtools initialIsOpen={false} />
        </AppLoader>
      </body>
    </html>
  );
};

const RootWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default RootWrapper;
