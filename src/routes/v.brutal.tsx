import { createFileRoute } from "@tanstack/react-router";

import { BrutalPage } from "../components/versions/BrutalPage";
import { copyForSearch, pageHead } from "../lib/seo";

export const Route = createFileRoute("/v/brutal")({
  head: ({ match }) => {
    const { locale, copy } = copyForSearch(match.search);
    return pageHead({
      title: `${copy.versions.brutal.name} — Vinícius Hack`,
      description: copy.versions.brutal.tag,
      path: "/v/brutal",
      locale,
      index: false,
    });
  },
  component: BrutalPage,
});
