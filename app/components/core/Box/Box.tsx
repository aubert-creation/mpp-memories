import type * as CSS from 'csstype';
import styled from 'styled-components';
import type {
  BackgroundImageProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
} from 'styled-system';
import {
  backgroundImage,
  border,
  borderRadius,
  borderStyle,
  color,
  flexbox,
  layout,
  position,
  shadow,
  space,
  grid
} from 'styled-system';

export type BoxProps = BorderProps &
  SpaceProps &
  FlexboxProps &
  PositionProps &
  ColorProps &
  LayoutProps &
  BackgroundImageProps &
  ShadowProps & {
    color?: CSS.Property.Color;
  } & {
    gap?: number;
  } & {
    disabled?: boolean;
  };

const Box = styled.div<BoxProps>`
  display: flex;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  ${({ theme, gap }) => gap && `gap: ${theme.space[gap] ?? gap}px;`}
  ${backgroundImage};
  ${color};
  ${space};
  ${border};
  ${borderStyle};
  ${borderRadius};
  ${flexbox};
  ${grid};
  ${position};
  ${layout};
  ${shadow};
`;

export const BoxHover = styled(Box)<{ disabled?: boolean }>`
  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

export default Box;
