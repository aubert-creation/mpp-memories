import type { ReactNode } from 'react';
import styled from 'styled-components';
import type { FlexboxProps, LayoutProps, SpaceProps, TypographyProps } from 'styled-system';
import { typography, flexbox, layout, space } from 'styled-system';
import type { BoxProps } from '../Box';
import Box from '../Box';
import type { ButtonVariant } from '../Button/Button';
import Button from '../Button/Button';
import type { IconType } from '../Icon/Icon';
import type { TypoVariants } from '../Typo/Typo';
import Typo from '../Typo/Typo';

export type CardProps = SpaceProps &
  LayoutProps &
  FlexboxProps &
  BoxProps &
  TypographyProps & {
    title?: string;
    titleVariant?: TypoVariants;
    buttonVariant?: ButtonVariant;
    buttonTitle?: string;
    children: ReactNode | ReactNode[];
    isClickable?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
    onButtonClick?: () => void;
    buttonRightIcon?: IconType;
    buttonLeftIcon?: IconType;
    buttonIconSize?: number;
    isFullScreen?: boolean;
  };

const WIDTH = 480;

const Card = ({
  title,
  titleVariant = 'header3',
  buttonVariant,
  buttonTitle,
  children,
  onButtonClick,
  buttonLeftIcon,
  buttonRightIcon,
  buttonIconSize,
  isClickable,
  isFullScreen = false,
  isSelected,
  onClick,
  ...rest
}: CardProps) => (
  <CustomBox
    boxShadow="light"
    isClickable={isClickable}
    isFullScreen={isFullScreen}
    bg={isSelected ? 'secondaryTrans.8' : 'white'}
    borderColor={isSelected ? 'secondary' : 'bg.dark'}
    borderWidth={1}
    borderStyle="solid"
    onClick={onClick}
    p={6}
    {...rest}
  >
    {title ? (
      <Typo display="block" textAlign="center" mb={6} variant={titleVariant} color="font.dark">
        {title}
      </Typo>
    ) : null}
    {children}
    {!!buttonVariant && !!buttonTitle && (
      <Button
        leftIconSize={buttonIconSize}
        rightIconSize={buttonIconSize}
        leftIcon={buttonLeftIcon}
        rightIcon={buttonRightIcon}
        onClick={onButtonClick}
        mt={6}
        variant={buttonVariant}
      >
        {buttonTitle}
      </Button>
    )}
  </CustomBox>
);

const CustomBox = styled(Box)<{ isClickable?: boolean; isFullScreen?: boolean }>`
  position: relative;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radii[2]}px;
  flex-direction: column;
  max-width: ${({ isFullScreen }) => (isFullScreen ? 'auto' : `${WIDTH}px`)};
  width: 100%;
  &:hover {
    border: 1px solid ${({ theme, isClickable }) => (isClickable ? theme.colors.secondary : theme.colors.bg.dark)};
    cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'auto')};
  }
  ${space}
  ${layout}
  ${flexbox}
  ${typography}
`;

export default Card;
