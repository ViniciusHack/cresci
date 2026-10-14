import { createFileRoute } from "@tanstack/react-router";

import { CasePage } from "../components/projects/CasePage";
import { ritmo } from "../lib/projects";
import { pageHead } from "../lib/seo";

export const Route = createFileRoute("/projetos/ritmo")({
  head: () =>
    pageHead({
      title: ritmo.meta.title,
      description: ritmo.meta.description,
      path: ritmo.path,
      locale: "pt-BR",
      alternates: false,
    }),
  component: () => <CasePage study={ritmo} />,
});
