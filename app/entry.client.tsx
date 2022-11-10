import { RemixBrowser } from '@remix-run/react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { hydrate } from 'react-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ThemeProvider } from 'styled-components';

import i18nextOptions from '@i18n/i18nextOptions';
import theme from '@theme/theme';
import resources from 'public/locales';

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      ...i18nextOptions,
      debug: false,
      resources,
      detection: {
        order: ['htmlTag'],
        caches: [],
      },
    })
    .then(() =>
      hydrate(
        <I18nextProvider i18n={i18next}>
          <ThemeProvider theme={theme}>
            <RemixBrowser />
          </ThemeProvider>
        </I18nextProvider>,
        document
      )
    );
}
