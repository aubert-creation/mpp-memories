import { PassThrough } from 'stream';

import { Response } from '@remix-run/node';
import type { EntryContext, EntryContext } from '@remix-run/node';
import { RemixServer, RemixServer } from '@remix-run/react';
import theme from '@theme/theme';
import isbot from 'isbot';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { ThemeProvider, ServerStyleSheet } from 'styled-components';

const ABORT_DELAY = 5000;

const handleRequest = (request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext) =>
  isbot(request?.headers?.get('user-agent'))
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
export default handleRequest;

const handleBotRequest = (request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext) =>
  new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(<RemixServer context={remixContext} url={request.url} />, {
      onAllReady: () => {
        const body = new PassThrough();

        responseHeaders.set('Content-Type', 'text/html');

        resolve(
          new Response(body, {
            headers: responseHeaders,
            status: didError ? 500 : responseStatusCode,
          })
        );

        pipe(body);
      },
      onShellError: (error: unknown) => {
        reject(error);
      },
      onError: (error: unknown) => {
        didError = true;

        console.error(error);
      },
    });

    setTimeout(abort, ABORT_DELAY);
  });

const handleBrowserRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) =>
  new Promise((resolve, reject) => {
    let didError = false;

    const sheet = new ServerStyleSheet();

    const { pipe, abort } = renderToPipeableStream(
      sheet.collectStyles(
        <ThemeProvider theme={theme}>
          <RemixServer context={remixContext} url={request.url} />
        </ThemeProvider>
      ),
      {
        onShellReady: () => {
          const body = new PassThrough();

          responseHeaders.set('Content-Type', 'text/html');

          // const styles = sheet.getStyleTags();
          // body.write(styles);

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError: (error: unknown) => {
          reject(error);
        },
        onError: (error: unknown) => {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
