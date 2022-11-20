import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import * as dotenv from 'dotenv';
import Pusher from 'pusher';

export const loader: LoaderFunction = async () => {
  return redirect('/');
};

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
});

export const action: ActionFunction = async ({ request }) => {
  dotenv.config();

  const requestText = await request.text();
  const form = new URLSearchParams(requestText);

  const event = {
    channel: form.get('channel'),
    type: form.get('type'),
    data: JSON.parse(form.get('data')),
  };

  pusher.trigger(event.channel, event.type, JSON.stringify(event.data), () => {
    return 'sent event successfully';
  });

  return 'ok';
};
