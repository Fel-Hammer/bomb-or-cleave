import { RemixServer } from "@remix-run/react";
import { type EntryContext, handleRequest } from "@vercel/remix";
import { nanoid } from "nanoid";

import { getEnv, init } from "~/lib/env.server.ts";
import { NonceProvider } from "~/lib/nonce-provider.ts";

init();
globalThis.ENV = getEnv();

export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const nonce = nanoid();

  const remixServer = (
    <NonceProvider value={nonce}>
      <RemixServer context={remixContext} url={request.url} nonce={nonce} />
    </NonceProvider>
  );
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer,
  );
}
