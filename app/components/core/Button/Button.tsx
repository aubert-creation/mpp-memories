import type { ReactNode } from 'react';
import styled from 'styled-components';
import type { BorderProps, FlexboxProps, LayoutProps, SpaceProps } from 'styled-system';
import {
  backgroundImage,
  border,
  borderRadius,
  color,
  flexbox,
  layout,
  position,
  shadow,
  space,
  variant as styledVariant,
} from 'styled-system';
import type { BoxProps } from '@components/core/Box';
import Box from '@components/core/Box';
import type { IconType } from '@components/core/Icon/Icon';
import Icon from '@components/core/Icon/Icon';
import Loader from '@components/core/Loader';
import Typo from '@components/core/Typo';
import type fontsVariant from '@theme/typos';

const HEIGHT_BUTTON = 40;
const DEFAULT_LOADER_SIZE = 20;
const DEFAULT_LOADER_OPACITY = 0.7;

export interface ButtonProps extends BorderProps, SpaceProps, FlexboxProps, LayoutProps {
  color?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: ButtonVariant;
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: IconType;
  leftIconSize?: number;
  leftIconColor?: string;
  rightIconColor?: string;
  rightIcon?: IconType;
  rightIconSize?: number;
  labelTypo?: keyof typeof fontsVariant;
  loaderSize?: number;
  loaderOpacity?: number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
  typoStyle?: SpaceProps;
  rightLabel?: string | number;
  rightLabelVariant?: keyof typeof fontsVariant;
  rightLabelColor?: string;
}

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'error';

export type ButtonState = 'default' | 'active' | 'hover';
export const iconColor: Record<ButtonVariant, Record<ButtonState, string>> = {
  default: { default: 'white', active: 'secondary', hover: '' },
  primary: { default: 'primary', active: 'white', hover: '' },
  secondary: { default: 'secondary', active: 'white', hover: '' },
  error: { default: 'white', active: 'white', hover: '' },
};

const Button = ({
  disabled,
  type,
  children,
  leftIcon,
  rightIcon,
  variant = 'default',
  onClick,
  leftIconColor,
  rightIconColor,
  isLoading,
  height = HEIGHT_BUTTON,
  borderStyle,
  leftIconSize,
  rightIconSize,
  labelTypo = 'button',
  loaderSize = DEFAULT_LOADER_SIZE,
  loaderOpacity = DEFAULT_LOADER_OPACITY,
  typoStyle,
  rightLabel,
  rightLabelVariant,
  rightLabelColor,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonContainer
      isLoading={isLoading}
      variant={variant}
      disabled={disabled || isLoading}
      onClick={onClick}
      height={height}
      borderStyle={borderStyle}
      type={type}
      {...rest}
    >
      {isLoading ? (
        <Loader size={loaderSize} opacity={loaderOpacity} />
      ) : (
        <>
          {!!leftIcon && (
            <Box pr={children ? 2 : 0}>
              <Icon size={leftIconSize} type={leftIcon} color={leftIconColor} />
            </Box>
          )}
          {!!children && (
            <Typo variant={labelTypo} {...typoStyle}>
              {children}
            </Typo>
          )}
          {!!rightIcon && (
            <Box pl={children ? 2 : 0}>
              <Icon size={rightIconSize} type={rightIcon} color={rightIconColor} />
            </Box>
          )}
          {!!rightLabel && (
            <Box position="absolute" right={2}>
              <Typo variant={rightLabelVariant} color={rightLabelColor}>
                {rightLabel}
              </Typo>
            </Box>
          )}
        </>
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<ButtonProps>`
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: none;
  background: transparent;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  border-width: 1px;
  border-radius: ${({ theme }) => theme.radii[2]}px;
  border-style: ${({ borderStyle }) => borderStyle || 'solid'};
  padding: 0 ${({ theme }) => theme.space[4]}px;
  border-radius: ${({ theme }) => theme.radii[2]}px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }

  ${() =>
    styledVariant<
      BoxProps & {
        '&:hover'?: BoxProps;
        '&:active'?: BoxProps;
        '&:disabled'?: BoxProps;
      },
      ButtonVariant
    >({
      variants: {
        default: {
          bg: 'secondary',
          borderColor: 'white',
          color: 'white',
          '&:hover': {
            bg: 'secondaryTrans.80',
          },
          '&:active': {
            bg: 'white',
            color: 'secondary',
            borderColor: 'secondary',
          },
          '&:disabled': {
            bg: 'bg.light',
            borderColor: 'bg.light',
            color: 'font.light',
          },
        },
        primary: {
          bg: 'primaryTrans.8',
          color: 'primary',
          borderColor: 'bg.light',
          '&:hover': {
            bg: 'primaryTrans.16',
            borderColor: 'primary',
          },
          '&:active': {
            bg: 'primary',
            color: 'white',
          },
          '&:disabled': {
            bg: 'bg.light',
            color: 'font.light',
            border: 'none',
          },
        },
        secondary: {
          bg: 'secondaryTrans.8',
          color: 'secondary',
          borderColor: 'bg.light',
          '&:hover': {
            bg: 'secondaryTrans.16',
            borderColor: 'secondary',
          },
          '&:active': {
            bg: 'secondary',
            color: 'white',
          },
          '&:disabled': {
            bg: 'bg.light',
            color: 'font.light',
            border: 'none',
          },
        },
        error: {
          bg: 'error',
          color: 'white',
          borderColor: 'white',
        },
      },
    })};
  ${backgroundImage}
  ${color};
  ${space};
  ${border};
  ${borderRadius}
  ${flexbox};
  ${position};
  ${layout};
  ${shadow};
`;

export default Button;
