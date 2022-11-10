import styled from 'styled-components';
import type { BorderProps, ColorProps, SpaceProps, FlexboxProps, PositionProps, LayoutProps } from 'styled-system';
import { border, color, space, flexbox, position, layout } from 'styled-system';

interface BoxProps extends BorderProps, ColorProps, SpaceProps, FlexboxProps, PositionProps, LayoutProps {}

const Image = styled.img<BoxProps>`
  ${border};
  ${color};
  ${space};
  ${flexbox};
  ${position};
  ${layout};
`;

export default Image;
