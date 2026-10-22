import { createFileRoute } from "@tanstack/react-router";

import { CasePage } from "../components/projects/CasePage";
import { alento } from "../lib/projects";
import { pageHead } from "../lib/seo";

export const Route = createFileRoute("/projetos/alento")({
  head: () =>
    pageHead({
      title: alento.meta.title,
      description: alento.meta.description,
      path: alento.path,
      locale: "pt-BR",
      alternates: false,
    }),
  component: () => <CasePage study={alento} />,
});
