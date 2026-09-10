import { createFileRoute } from "@tanstack/react-router";

import { VersoesPage } from "../components/versions/VersoesPage";
import { copies } from "../lib/copy";
import { pageHead } from "../lib/seo";

export const Route = createFileRoute("/en/versoes")({
  head: () =>
    pageHead({
      title: copies.en.versions.meta.title,
      description: copies.en.versions.meta.description,
      path: "/versoes",
      locale: "en",
    }),
  component: VersoesPage,
});
