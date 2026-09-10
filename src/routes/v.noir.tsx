import { createFileRoute } from "@tanstack/react-router";

import { NoirPage } from "../components/versions/NoirPage";
import { copyForLocation, pageHead } from "../lib/seo";

export const Route = createFileRoute("/v/noir")({
  head: ({ match }) => {
    const { locale, copy } = copyForLocation(match.pathname, match.search);
    return pageHead({
      title: `${copy.versions.noir.name} — Vinícius Hack`,
      description: copy.versions.noir.tag,
      path: "/v/noir",
      locale,
      index: false,
    });
  },
  component: NoirPage,
});
