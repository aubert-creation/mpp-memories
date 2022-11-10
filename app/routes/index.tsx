import type { LoaderFunction } from '@remix-run/node';
import Box from '@components/core/Box';

import Footer from '@components/layout/Footer';
import { NAVBAR_HEIGHT } from '@components/layout/Header';

export const loader: LoaderFunction = async ({ request }) => {
  console.log('request', request);
  return {};
};

const Index = () => {
  return (
    <>
      <Box
        flexDirection="column"
        justifyContent="center"
        minWidth="100%"
        minHeight={`calc(100vh - ${NAVBAR_HEIGHT}px)`}
        bg="white"
      >
        HOMEPAGE
      </Box>

      <Footer />
    </>
  );
};

export default Index;
