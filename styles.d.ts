import type theme from '~/theme/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof theme.colors;
    fonts: typeof theme.fonts;
    fontSizes: typeof theme.fontSizes;
    typos: typeof theme.typos;
    space: typeof theme.space;
    sizes: typeof theme.sizes;
    radii: typeof theme.radii;
    shadows: typeof theme.shadows;
  }
}
