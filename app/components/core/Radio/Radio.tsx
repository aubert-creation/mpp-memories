import type { ReactNode } from 'react';
import styled from 'styled-components';
import Box from '@components/core/Box';
import Icon from '@components/core/Icon/Icon';

const RADIO_SIZE = 20;

type RadioProps = {
  disabled?: boolean;
  checked: boolean;
};

const Radio = ({ disabled = false, checked }: RadioProps) => (
  <CustomRadio checked={checked} disabled={disabled}>
    <Icon type="Check" color={checked ? 'white' : 'transparent'} />
  </CustomRadio>
);

type CustomRadioProps = {
  checked: boolean;
  disabled: boolean;
  children: ReactNode;
};

const CustomRadio = styled(Box)<CustomRadioProps>`
  height: ${RADIO_SIZE}px;
  width: ${RADIO_SIZE}px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ checked, theme }) => (checked ? theme.colors.secondary : theme.colors.white)};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  filter: opacity(${({ disabled }) => (disabled ? '50%' : '100%')});
  border-radius: ${({ theme }) => theme.radii[3]}px;
`;

export default Radio;
