import { createMiddleware, createStart } from "@tanstack/react-start";

import { canonicalRequestUrl } from "./lib/locale";

const canonicalHost = createMiddleware().server(async ({ next, request }) => {
  const target = canonicalRequestUrl(new URL(request.url));
  if (target) {
    return Response.redirect(target, 301);
  }
  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [canonicalHost],
}));
