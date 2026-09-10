import { createFileRoute } from "@tanstack/react-router";

import { StudioPage } from "../components/versions/StudioPage";
import { copies } from "../lib/copy";
import { homeJsonLd, pageHead } from "../lib/seo";

export const Route = createFileRoute("/en")({
  head: () => ({
    ...pageHead({
      title: copies.en.meta.title,
      description: copies.en.meta.description,
      path: "/",
      locale: "en",
    }),
    scripts: [homeJsonLd("en")],
  }),
  component: StudioPage,
});
