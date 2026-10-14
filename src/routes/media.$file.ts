import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

// Os vídeos das capas passam por aqui: os assets estáticos do Worker respondem sempre 200 inteiro,
// e o Safari do iPhone só toca vídeo se o servidor aceitar pedido em partes (Range → 206).
const VIDEO = /^[a-z0-9-]+\.mp4$/;

type AssetsEnv = { ASSETS: { fetch: (input: Request | string) => Promise<Response> } };

export const Route = createFileRoute("/media/$file")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        if (!VIDEO.test(params.file)) return new Response("Not found", { status: 404 });
        const assetUrl = new URL(`/comercial/${params.file}`, request.url);
        const asset = await (env as AssetsEnv).ASSETS.fetch(new Request(assetUrl));
        if (!asset.ok) return new Response("Not found", { status: 404 });

        const body = await asset.arrayBuffer();
        const size = body.byteLength;
        const headers = new Headers({
          "Content-Type": "video/mp4",
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=86400",
        });

        const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("Range") ?? "");
        if (!range || (range[1] === "" && range[2] === "")) {
          headers.set("Content-Length", String(size));
          return new Response(body, { status: 200, headers });
        }
        let start = range[1] === "" ? size - Number(range[2]) : Number(range[1]);
        let end = range[1] !== "" && range[2] !== "" ? Number(range[2]) : size - 1;
        start = Math.max(0, start);
        end = Math.min(end, size - 1);
        if (start > end || start >= size) {
          headers.set("Content-Range", `bytes */${size}`);
          return new Response(null, { status: 416, headers });
        }
        headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
        headers.set("Content-Length", String(end - start + 1));
        return new Response(body.slice(start, end + 1), { status: 206, headers });
      },
    },
  },
});
