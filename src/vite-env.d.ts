/// <reference types="vite/client" />

// Runtime do Worker (só o que o site usa).
declare module "cloudflare:workers" {
  export const env: unknown;
}
