import { createMiddleware, createStart } from "@tanstack/react-start";

import { canonicalLocation } from "./lib/site";

const canonicalHost = createMiddleware().server(async ({ next, request }) => {
  const target = canonicalLocation(new URL(request.url));
  if (target) {
    return Response.redirect(target, 301);
  }
  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [canonicalHost],
}));
