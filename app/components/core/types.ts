import type { BoxProps } from './Box/Box';

export type VariantInteractive = BoxProps & {
  '&:hover'?: BoxProps;
  '&:focus'?: BoxProps & { outline?: string };
  '&:disabled'?: BoxProps;
  '&:active'?: BoxProps;
  '&::placeholder'?: BoxProps;
};
