import type { ReactNode } from 'react';
import Box from '@components/core/Box';

const BODY_MAX_WIDTH = 992;

const OutletContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="block" maxWidth={BODY_MAX_WIDTH} width="100%">
      {children}
    </Box>
  );
};

export default OutletContainer;
