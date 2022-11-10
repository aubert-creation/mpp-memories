import type { ReactNode } from 'react';
import styled from 'styled-components';
import type { TypoProps } from '@components/core/Typo';
import Typo from '@components/core/Typo';

type CellProps = TypoProps & {
  children?: ReactNode;
  width?: string | number;
};

const Cell = ({ children, width, ...props }: CellProps) => {
  return (
    <StyledTD as="td" width={width} variant="bodySmall" color="font.medium" {...props}>
      {children}
    </StyledTD>
  );
};

const StyledTD = styled(Typo)`
  display: table-cell;
  text-align: center;
  padding: 5px 0;
`;
export default Cell;
