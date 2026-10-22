import { createFileRoute } from "@tanstack/react-router";

import { CasePage } from "../components/projects/CasePage";
import { lume } from "../lib/projects";
import { pageHead } from "../lib/seo";

export const Route = createFileRoute("/projetos/lume")({
  head: () =>
    pageHead({
      title: lume.meta.title,
      description: lume.meta.description,
      path: lume.path,
      locale: "pt-BR",
      alternates: false,
    }),
  component: () => <CasePage study={lume} />,
});
