import styled from 'styled-components';
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
} from 'styled-system';
import type { BoxProps } from '../Box/Box';

const BoxButton = styled.button<BoxProps>`
  display: flex;
  box-sizing: border-box;
  border: none;
  background: transparent;
  outline: none;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
  ${({ theme, gap }) => gap && `gap: ${theme.space[gap] ?? gap}px;`}
  ${backgroundImage}
  ${color}
  ${space}
  ${border}
  ${borderStyle}
  ${borderRadius}
  ${flexbox}
  ${position}
  ${layout}
  ${shadow}
`;

export default BoxButton;
