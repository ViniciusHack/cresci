import { createFileRoute } from "@tanstack/react-router";

import { VersoesPage } from "../components/versions/VersoesPage";
import { copyForSearch, pageHead } from "../lib/seo";

export const Route = createFileRoute("/versoes")({
  head: ({ match }) => {
    const { locale, copy } = copyForSearch(match.search);
    return pageHead({
      title: copy.versions.meta.title,
      description: copy.versions.meta.description,
      path: "/versoes",
      locale,
    });
  },
  component: VersoesPage,
});
