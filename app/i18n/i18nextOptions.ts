export default {
  debug: process.env.NODE_ENV !== 'production',
  fallbackLng: 'fr',
  supportedLngs: ['en', 'fr', 'es'],
  defaultNS: 'common',
  react: { useSuspense: false },
};
