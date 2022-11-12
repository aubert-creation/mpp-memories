import type { LoaderFunction } from '@remix-run/node';
import Box from '@components/core/Box';

import Footer from '@components/layout/Footer';
import { NAVBAR_HEIGHT } from '@components/layout/Header';
import Button from '@components/core/Button';
import routes from '@nav/routes';
import { useNavigate } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  console.log('request', request);
  return {};
};

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Box
        flexDirection="column"
        justifyContent="center"
        minWidth="100%"
        minHeight={`calc(100vh - ${NAVBAR_HEIGHT}px)`}
        bg="white"
      >
        <Button variant="primary" onClick={() => navigate(routes.singlePlayer())}>Singleplayer</Button>
        <Button variant="secondary" onClick={() => navigate(routes.multiPlayer())}>Multiplayer</Button>

      </Box>

      <Footer />
    </>
  );
};

export default Index;