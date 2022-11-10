import type { ReactNode } from 'react';
import styled from 'styled-components';
import Box from '@components/core/Box';
import Icon from '@components/core/Icon/Icon';

const CHECK_BOX_SIZE = 20;

type CheckBoxProps = {
  disabled?: boolean;
  isChecked: boolean;
  isPartiallyChecked?: boolean;
};

const CheckBox = ({ disabled = false, isChecked = false, isPartiallyChecked = false }: CheckBoxProps) => (
  <CustomCheckBox checked={isChecked} disabled={disabled} isPartiallyChecked={isPartiallyChecked}>
    <Icon
      type={isPartiallyChecked ? 'Minus' : 'Check'}
      color={isChecked || isPartiallyChecked ? 'white' : 'transparent'}
      size={CHECK_BOX_SIZE}
    />
  </CustomCheckBox>
);

export default CheckBox;

type CustomCheckBoxProps = {
  isPartiallyChecked?: boolean;
  checked: boolean;
  partiallyChecked?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

const CustomCheckBox = styled(Box)<CustomCheckBoxProps>`
  height: ${CHECK_BOX_SIZE}px;
  width: ${CHECK_BOX_SIZE}px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ checked, isPartiallyChecked, theme }) => (checked || isPartiallyChecked ? theme.colors.secondary : '')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  filter: opacity(${({ disabled }) => (disabled ? '50%' : '100%')});
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${({ theme }) => theme.radii[1]}px;
`;
