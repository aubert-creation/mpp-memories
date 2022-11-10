import { resolve } from 'node:path';
import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { createInstance } from 'i18next';
import { renderToString } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ThemeProvider, ServerStyleSheet } from 'styled-components';
import i18n from '@i18n/i18n.server';
import i18nextOptions from '@i18n/i18nextOptions';
import theme from '@theme/theme';
import resources from 'public/locales';

process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled rejection (promise: ${promise}, reason: ${err})`);
});

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  try {
    const sheet = new ServerStyleSheet();

    const instance = createInstance();
    const lng = await i18n.getLocale(request);
    const ns = i18n.getRouteNamespaces(remixContext);

    await instance.use(initReactI18next).init({
      ...i18nextOptions,
      debug: false,
      resources,
      lng,
      ns,
      backend: {
        loadPath: resolve('./', './public/locales/{{lng}}/{{ns}}.json'),
      },
    });

    let markup = renderToString(
      sheet.collectStyles(
        <I18nextProvider i18n={instance}>
          <ThemeProvider theme={theme}>
            <RemixServer context={remixContext} url={request.url} />
          </ThemeProvider>
        </I18nextProvider>
      )
    );

    const styles = sheet.getStyleTags();
    markup = markup.replace('__STYLES__', styles);

    responseHeaders.set('Content-Type', 'text/html');

    return new Response(`<!DOCTYPE html>${markup}`, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`[MPG ERROR] ${error}`);
    return undefined;
  }
}
