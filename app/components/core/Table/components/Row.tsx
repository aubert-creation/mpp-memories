import type { ReactNode } from 'react';
import styled from 'styled-components';
import type { HeightProps } from 'styled-system';

type RowProps = HeightProps & {
  children: ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  disabledHover?: boolean;
};

const Row = styled('tr')<RowProps>`
  height: ${({ height }) => height ?? '56px'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.light};
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.secondaryTrans['8'] : theme.colors.white)};
  &:hover {
    background-color: ${({ isSelected, theme, disabledHover }) =>
      !disabledHover && (isSelected ? theme.colors.secondaryTrans['8'] : theme.colors.bg.light)};
  }
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export default Row;
