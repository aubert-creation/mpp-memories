import type { ReactNode } from 'react';
import styled from 'styled-components';
import type { TypoProps } from '@components/core/Typo';
import Typo from '@components/core/Typo';
import type { OrderState, OrderKey } from '@hooks/filters/useOrder';

type HeadCellProps = TypoProps & {
  children?: ReactNode;
  orderOpt?: OrderState;
  orderKey?: OrderKey;
  isExtendable?: boolean;
  onPress?: (key: OrderKey) => void | undefined;
  px?: number;
};

const HeadCell = ({ children, orderOpt, orderKey, onPress, isExtendable, px, ...props }: HeadCellProps) => {
  const isSelected = orderOpt?.key && orderOpt?.key === orderKey;
  return (
    <StyledTH onClick={() => onPress?.(orderKey!)} isExtendable={isExtendable} px={px}>
      <StyledTypo variant="bodySmall" isSelected={isSelected} justifyContent="center" {...props}>
        {children}
      </StyledTypo>
    </StyledTH>
  );
};

const StyledTH = styled.th<{ isExtendable: boolean | undefined; px: number | undefined }>`
  position: sticky;
  top: 0;
  z-index: 0;
  padding: 0 ${({ px }) => px ?? `8px`};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ isExtendable }) => isExtendable && `width: 100%;`}
  white-space: nowrap;
`;

const StyledTypo = styled(Typo)<{ isSelected: boolean | undefined; textColor?: string }>`
  white-space: nowrap;
  align-items: center;
  color: ${({ theme, isSelected, color }) => color ?? (isSelected ? theme.colors.secondary : theme.colors.font.light)};
  &:hover {
    color: ${({ theme, isSelected, color }) => color ?? (isSelected ? theme.colors.secondary : theme.colors.font.dark)};
  }
`;

export default HeadCell;
