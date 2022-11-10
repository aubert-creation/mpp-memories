import breakpoints from '@theme/breakpoints';
import colors from './colors';
import { fonts, fontSizes } from './fonts';
import radii from './radii';
import shadows from './shadows';
import sizes from './sizes';
import space from './spaces';
import typos from './typos';

const theme = {
  colors,
  fonts,
  fontSizes,
  typos, // usable fonts for typos (eg: legend = { Avenir-Book - 12px })
  space, // margins & paddings
  sizes, // widths & heights
  radii, // border-radius
  shadows,
  breakpoints,
};

export default theme;
