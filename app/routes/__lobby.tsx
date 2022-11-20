import { PusherProvider } from '@harelpls/use-pusher';
import { Outlet } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';

const Lobby = () => {
  const config = {
    clientKey: 'aee979debed0ca127efc',
    cluster: 'eu',
    authEndpoint: 'https://mpp-memories-api.vercel.app/api/auth/',
  };

  return (
    <ClientOnly>
      {() => (
        <PusherProvider {...config}>
          <Outlet />
        </PusherProvider>
      )}
    </ClientOnly>
  );
};

export default Lobby;
