import type { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react';
import styled from 'styled-components';
import type { TextAlignProps } from 'styled-system';
import { variant as styledVariant } from 'styled-system';
import type { BoxProps } from '@components/core/Box';
import Box from '@components/core/Box';
import type { VariantInteractive } from '@components/core/types';
import Typo from '@components/core/Typo';
import LoupeUrl from '@assets/img/core/loupe.png';
import Icon from '../Icon';
import type { IconProps } from '../Icon';

export type TextInputVariant = 'default' | 'error' | 'light';

export const INPUT_HEIGHT = 56;
export const ERROR_EXTRA_HEIGHT = 20;
export const SMALL_HEIGHT = 32;

type TextInputProps = {
  variant: TextInputVariant;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  canDisplayError?: boolean;
  errorLabel?: string;
  onChange?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>['onChange'];
  disabled?: boolean;
  id: string;
  name: string;
  type?: 'text' | 'number' | 'password';
  small?: boolean;
  textAlign?: TextAlignProps['textAlign'];
  iconLeft?: IconProps;
  iconRight?: IconProps;
  inputRef?: Ref<HTMLInputElement>;
  withBoxShadow?: boolean;
};

const TextInput = ({
  variant = 'default',
  placeholder,
  value,
  defaultValue,
  disabled,
  onChange,
  id,
  name,
  type = 'text',
  canDisplayError,
  errorLabel,
  textAlign,
  small,
  iconLeft,
  iconRight,
  inputRef,
  withBoxShadow = true,
  ...rest
}: TextInputProps & BoxProps) => (
  <Box maxWidth={640} width="100%" position="relative" flexDirection="column" {...rest}>
    <Box width="100%" height={small ? SMALL_HEIGHT : INPUT_HEIGHT}>
      <InputContainer
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={!!disabled}
        textAlign={textAlign}
        variant={variant}
        small={small}
        iconLeft={iconLeft}
        iconRight={iconRight}
        defaultValue={defaultValue}
        withBoxShadow={withBoxShadow}
      />
      {iconLeft && <StyledIconLeft {...iconLeft} />}
      {iconRight && <StyledIconRight {...iconRight} />}
    </Box>

    {canDisplayError && (
      <Box px={2} height={ERROR_EXTRA_HEIGHT}>
        {variant === 'error' && errorLabel && !small && (
          <Typo variant="bodySmall" color="error">
            {errorLabel}
          </Typo>
        )}
      </Box>
    )}
  </Box>
);

export default TextInput;

const InputContainer = styled.input<TextInputProps>`
  background-image: ${({ small }) => small && `url(${LoupeUrl})`};
  background-repeat: no-repeat;
  background-position: ${({ theme }) => theme.radii[2]}px center;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: ${({ textAlign }) => textAlign ?? 'left'};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radii[2]}px;
  padding: ${({ theme, small }) => (small ? `${theme.space[4]}px ${theme.space[10]}px` : `${theme.space[4]}px`)};
  font-family: ${({ theme }) => theme.typos.body.fontFamily};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.font.light};
  }
  overflow: hidden;
  ${({ theme, iconLeft }) => iconLeft && `padding-left: ${theme.space[12]}px;`}
  ${({ theme, iconRight }) => iconRight && `padding-right: ${theme.space[12]}px;`}
  
  ${({ theme, withBoxShadow }) =>
    styledVariant<VariantInteractive>({
      variants: {
        default: {
          color: 'font.dark',
          borderColor: 'bg.dark',
          '&:hover': {
            borderColor: 'secondary',
          },
          '&:focus': {
            outline: 'none',
            borderColor: 'secondary',
            boxShadow: withBoxShadow && theme.shadows.secondary,
          },
          '&:disabled': {
            borderColor: 'bg.dark',
            backgroundColor: 'bg.light',
            color: '#959DAF',
          },
        },
        error: {
          color: 'error',
          borderColor: 'error',
          '&:focus': {
            outline: 'none',
          },
        },
        light: {
          color: 'white',
          backgroundColor: 'whiteTrans.16',
          borderColor: 'bg.dark',
          '&:hover': {},
          '&:focus': {
            outline: 'none',
            boxShadow: withBoxShadow && theme.shadows.secondary,
          },
          '&::placeholder': {
            color: 'white',
          },
          '&:disabled': {
            borderColor: 'bg.dark',
            color: 'white',
          },
        },
      },
    })}
`;

const StyledIconLeft = styled(Icon)`
  position: absolute;
  left: ${({ theme }) => theme.space[4]}px;
  top: ${({ theme }) => theme.space[4]}px;
  font-size: ${({ theme }) => theme.typos.body.fontSize};
  color: ${({ theme }) => theme.colors.font.dark};
`;

const StyledIconRight = styled(Icon)`
  position: absolute;
  right: ${({ theme }) => theme.space[4]}px;
  top: ${({ theme }) => theme.space[4]}px;
  font-size: ${({ theme }) => theme.typos.body.fontSize};
  color: ${({ theme }) => theme.colors.font.dark};
`;
