/**
 * SHOULD NOT BE EDITED
 */

import { fonts, fontSizes } from './fonts';

// Typos variants used in the app
const fontsVariant = {
  heavyTitle: {
    fontFamily: fonts.black,
    fontSize: fontSizes[25],
  },
  preTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes['2.5'],
  },
  bodySmall: {
    fontFamily: fonts.medium,
    fontSize: fontSizes[3],
  },
  bodyStrong: {
    fontFamily: fonts.heavy,
    fontSize: fontSizes['3.75'],
  },
  body: {
    fontFamily: fonts.book,
    fontSize: fontSizes['3.75'],
  },
  bodyPointer: {
    fontFamily: fonts.medium,
    fontSize: fontSizes['3.75'],
    cursor: 'pointer',
  },
  button: {
    fontFamily: fonts.medium,
    fontSize: fontSizes['4.5'],
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes[4],
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes[5],
  },
  header3: {
    fontFamily: fonts.heavy,
    fontSize: fontSizes[5],
  },
  header2: {
    fontFamily: fonts.heavy,
    fontSize: fontSizes[6],
  },
  header1: {
    fontFamily: fonts.black,
    fontSize: fontSizes[10],
  },
};

export default fontsVariant;
