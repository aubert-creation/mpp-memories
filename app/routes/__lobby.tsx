import { PusherProvider } from '@harelpls/use-pusher';
import { Outlet } from '@remix-run/react';

const Lobby = () => {
  const config = {
    clientKey: 'aee979debed0ca127efc',
    cluster: 'eu',
  };

  return (
    <PusherProvider {...config}>
      <Outlet />
    </PusherProvider>
  );
};

export default Lobby;
