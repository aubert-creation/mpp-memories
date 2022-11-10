import { resolve } from 'node:path';
import Backend from 'i18next-fs-backend';
import { RemixI18Next } from 'remix-i18next';

import i18nextOptions from './i18nextOptions';

export default new RemixI18Next({
  detection: {
    supportedLanguages: i18nextOptions.supportedLngs,
    fallbackLanguage: i18nextOptions.fallbackLng,
  },
  i18next: {
    backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
  },
  backend: Backend,
});
