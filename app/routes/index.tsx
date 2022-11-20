import Box from '@components/core/Box';

import Button from '@components/core/Button';
import Footer from '@components/layout/Footer';
import { NAVBAR_HEIGHT } from '@components/layout/Header';
import routes from '@nav/routes';
import type { LoaderFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  return {};
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minWidth="100%"
        minHeight={`calc(100vh - ${NAVBAR_HEIGHT}px)`}
        bg="white"
      >
        <Button width={200} variant="primary" onClick={() => navigate(routes.singlePlayer())} mb={5}>
          Partie en solo
        </Button>
        <Button width={200} variant="secondary" onClick={() => navigate(routes.multiPlayer())}>
          Partie en duo
        </Button>
      </Box>

      <Footer />
    </>
  );
};

export default Index;
