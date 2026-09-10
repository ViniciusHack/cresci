import { createFileRoute } from "@tanstack/react-router";

import { StudioPage } from "../components/versions/StudioPage";
import { copyForSearch, homeJsonLd, pageHead } from "../lib/seo";

export const Route = createFileRoute("/")({
  head: ({ match }) => {
    const { locale, copy } = copyForSearch(match.search);
    return {
      ...pageHead({
        title: copy.meta.title,
        description: copy.meta.description,
        path: "/",
        locale,
      }),
      scripts: [homeJsonLd(locale)],
    };
  },
  component: StudioPage,
});
