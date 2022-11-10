import type { ReactNode } from 'react';
import styled from 'styled-components';
import ScrollBox from '@components/core/ScrollBox';
import Body from './components/Body';
import Cell from './components/Cell';
import HeadCell from './components/HeadCell';
import Header from './components/Header';
import Row from './components/Row';

type TableProps = {
  children: ReactNode;
  maxHeight?: number;
  maxWidth?: number;
  disableInnerScroll?: boolean;
};

const Table = ({ children, maxHeight, maxWidth, disableInnerScroll }: TableProps) => {
  if (maxHeight && (maxHeight <= 0 || maxHeight === Infinity)) return null;

  return (
    <StyledBox maxHeight={maxHeight} maxWidth={maxWidth} disableInnerScroll={disableInnerScroll}>
      <StyledTable>{children}</StyledTable>
    </StyledBox>
  );
};

const StyledBox = styled(ScrollBox)<{ disableInnerScroll?: boolean }>`
  flex: 1;
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}px`};
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}px`};
  ${({ disableInnerScroll }) => !disableInnerScroll && 'overflow: auto;'}
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledTable = styled.table<{ tablePaddingX?: number | string }>`
  flex: 1;
  display: block;
  table-layout: auto;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-collapse: collapse;
`;

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Cell = Cell;
Table.HeadCell = HeadCell;

export default Table;
