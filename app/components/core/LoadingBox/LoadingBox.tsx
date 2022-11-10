import React from 'react';
import type { BoxProps } from '../Box';
import Box from '../Box';
import type { SVGProps } from '../Icon/types';
import Loader from '../Loader';

type Props = BoxProps & SVGProps;

const LoadingBox = (props: Props) => {
  return (
    <Box alignItems="center" justifyContent="center" flex={1} bg="bg.medium" {...props}>
      <Loader color={props.color} size={props.size ?? 48} />
    </Box>
  );
};

export default LoadingBox;
