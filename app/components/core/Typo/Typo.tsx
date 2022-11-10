import type * as CSS from 'csstype';
import styled from 'styled-components';
import type {
  ColorProps,
  DisplayProps,
  TextStyleProps,
  TypographyProps,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
} from 'styled-system';
import { layout, flexbox, color, display, space, typography, variant, textStyle } from 'styled-system';
import type typos from '@theme/typos';

export type TypoVariants = keyof typeof typos;

export interface TypoProps extends TypographyProps, ColorProps, SpaceProps, TextStyleProps, DisplayProps, FlexboxProps {
  variant?: TypoVariants;
  color?: CSS.Property.Color;
}
const Typo = styled.p<TypoProps>`
  display: flex;
  margin: 0;
  white-space: pre-wrap;
  ${variant({
    scale: 'typos', // Variants are styled directly with the theme defined in theme/typos.ts
  })}
  ${typography}
  ${color}
  ${space}
  ${display}
  ${textStyle}
  ${flexbox}
`;
/**
 * you must defined a Width or a maxWidth to crop the text
 */
export const TypoCropped = styled(Typo)<LayoutProps>`
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  display: inline;
  ${layout}
`;

export default Typo;
