import type { LoaderFunction } from '@remix-run/node';
import Box from '@components/core/Box';

import Footer from '@components/layout/Footer';
import { NAVBAR_HEIGHT } from '@components/layout/Header';
import Button from '@components/core/Button';
import routes from '@nav/routes';
import { useNavigate } from '@remix-run/react';

const SinglePlayer = () => {
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
        <Button variant="primary" onClick={() => navigate(routes.singlePlayer())}>Contre la montre</Button>
        <Button variant="secondary" onClick={() => navigate(routes.game())}>Nombre de coup</Button>
      </Box>

      <Footer />
    </>
  );
};

export default SinglePlayer;
